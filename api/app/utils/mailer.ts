import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;
// const oauthLink = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH_TOKEN } =
	process.env;

const auth = new OAuth2(
	MAILING_ID,
	MAILING_SECRET,
	MAILING_REFRESH_TOKEN
	// oauthLink
);

export const sendVerificationEmail = (
	email: string,
	name: string,
	url: string
) => {
	auth.setCredentials({
		refresh_token: MAILING_REFRESH_TOKEN,
	});

	const accessToken = auth.getAccessToken() as unknown as string;
	const stmp = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: EMAIL,
			clientId: MAILING_ID,
			clientSecret: MAILING_SECRET,
			refreshToken: MAILING_REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: 'Facebook email verification.',
		html: `<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif">
        <div style="display:flex;align-items:center;gap:10px;color:#3b5990;padding:20px">
        <img src="https://res.cloudinary.com/ndsnvf0/image/upload/v1662726261/facebook/icon_ut16yf.png" alt="FB_logo" width="50" height="50" loading="lazy" />
        <b>Action needed: Activate your facebook account.</b>
        </div>
        <div style="padding:20px;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823">
        <span>Hello, ${name}</span>
        <div style="margin-top:10px;color:#666666">
        <span>
        You recently created an account on Facebbok. To complete
        your registeration, please confirm your account.
        </span>
        </div>
        <a style="display:inline-block;margin-top:20px;padding:10px 15px;color:#fff;background-color:#4c649b;text-decoration:none;font-weight:600;border-radius:3px" href="${url}">Confirm Your Account</a>
        <br />
        <div style="margin-top:10px;color:#666666">
        <span>
        Facebook allows you to stay in touch with all your friends,
        once registered on Facebbok, you can share photos, organize
        events and much more.
        </span>
        </div>
        </div>
        </body>`,
	};

	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return err;

		return res;
	});
};

export const resetPassowrdCodeVerificationEmail = (
	email?: string,
	name?: string,
	code?: string
) => {
	auth.setCredentials({
		refresh_token: MAILING_REFRESH_TOKEN,
	});

	const accessToken = auth.getAccessToken() as unknown as string;
	const stmp = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: EMAIL,
			clientId: MAILING_ID,
			clientSecret: MAILING_SECRET,
			refreshToken: MAILING_REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: 'Facebook reset password.',
		html: `<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif">
        <div style="display:flex;align-items:center;gap:10px;color:#3b5990;padding:20px">
        <img src="https://res.cloudinary.com/ndsnvf0/image/upload/v1662726261/facebook/icon_ut16yf.png" alt="FB_logo" width="50" height="50" loading="lazy" />
        <b>Action needed: Activate your facebook account.</b>
        </div>
        <div style="padding:20px;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823">
        <span>Hello, ${name}</span>
        <div style="margin-top:10px;color:#666666">
        <span>
        You recently created an account on Facebbok. To complete
        your registeration, please confirm your account.
        </span>
        </div>
        <div style="display:inline-block;margin-top:20px;padding:10px 15px;color:#fff;background-color:#4c649b;text-decoration:none;font-weight:600;border-radius:3px">${code}</div>
        <br />
        <div style="margin-top:10px;color:#666666">
        <span>
        Facebook allows you to stay in touch with all your friends,
        once registered on Facebbok, you can share photos, organize
        events and much more.
        </span>
        </div>
        </div>
        </body>`,
	};

	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return err;

		return res;
	});
};
