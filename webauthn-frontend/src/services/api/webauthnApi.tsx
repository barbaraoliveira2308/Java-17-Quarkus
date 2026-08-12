import { apiPost } from './httpClient';
import {
  base64urlToBuffer,
  bufferToBase64url,
} from '../webauthn/webauthnHelpers';

export async function registerPasskey(username: string): Promise<void> {
  const options = await apiPost<any>(
    "/api/webauthn/register/options",
    { username },
  );

  options.publicKey.challenge = base64urlToBuffer(
    options.publicKey.challenge,
  );
  options.publicKey.user.id = base64urlToBuffer(options.publicKey.user.id);
  if (options.publicKey.excludeCredentials) {
    options.publicKey.excludeCredentials = options.publicKey.excludeCredentials.map(
      (c: any) => ({
        ...c,
        id: base64urlToBuffer(c.id),
      }),
    );
  }

  const credential = (await navigator.credentials.create(
    options,
  )) as PublicKeyCredential;
  const response = credential.response as AuthenticatorAttestationResponse;

  const credentialData = {
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    type: credential.type,
    response: {
      clientDataJSON: bufferToBase64url(response.clientDataJSON),
      attestationObject: bufferToBase64url(response.attestationObject),
    },
  };

  await apiPost("/api/webauthn/register", {
    username,
    credential: credentialData,
  });
}

export async function loginWithPasskey(username?: string): Promise<void> {
  const options = await apiPost<any>(
    "/api/webauthn/login/options",
    { username },
  );

  options.publicKey.challenge = base64urlToBuffer(
    options.publicKey.challenge,
  );
  if (options.publicKey.allowCredentials) {
    options.publicKey.allowCredentials = options.publicKey.allowCredentials.map(
      (c: any) => ({
        ...c,
        id: base64urlToBuffer(c.id),
      }),
    );
  }

  const credential = (await navigator.credentials.get(
    options,
  )) as PublicKeyCredential;
  const response = credential.response as AuthenticatorAssertionResponse;

  const credentialData = {
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    type: credential.type,
    response: {
      clientDataJSON: bufferToBase64url(response.clientDataJSON),
      authenticatorData: bufferToBase64url(response.authenticatorData),
      signature: bufferToBase64url(response.signature),
      userHandle: response.userHandle
        ? bufferToBase64url(response.userHandle)
        : null,
    },
  };

  await apiPost("/api/webauthn/login", {
    username,
    credential: credentialData,
  });
}