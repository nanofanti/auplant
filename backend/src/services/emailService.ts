import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await resend.emails.send({
    from: "AuPlant <onboarding@resend.dev>",
    to: email,
    subject: "Reset your AuPlant password",
    html: `
      <h1>Reset your password</h1>

      <p>
        We received a request to reset your AuPlant password.
      </p>

      <p>
        <a href="${resetUrl}">
          Reset password
        </a>
      </p>

      <p>
        This link expires in 15 minutes.
      </p>

      <p>
        If you didn't request a password reset, you can ignore this email.
      </p>
    `,
  });
}
