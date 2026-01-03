type GetTokenFn = (options?: { template?: string }) => Promise<string | null>;

export async function getClerkJwt(getToken: GetTokenFn): Promise<string> {
  const template = process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE;
  const token = await getToken(template ? { template } : undefined);

  if (!token) {
    throw new Error(
      "Clerk JWT is missing. Ensure Clerk JWT templates are configured (or a session JWT is enabled) and, if needed, set NEXT_PUBLIC_CLERK_JWT_TEMPLATE to your template name."
    );
  }

  return token;
}
