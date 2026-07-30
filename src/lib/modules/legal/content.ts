export type LegalDocumentKey = 'privacy' | 'terms';

export type LegalSection = {
	id: string;
	heading: string;
	paragraphs?: string[];
	bullets?: string[];
	content?: Array<{ paragraph: string } | { bullets: string[] }>;
};

export type LegalDocument = {
	key: LegalDocumentKey;
	eyebrow: string;
	title: string;
	description: string;
	intro: string;
	updatedLabel: string;
	sections: LegalSection[];
};

const updatedLabel = 'Last updated 31 July 2026';

const documents: Record<LegalDocumentKey, LegalDocument> = {
	privacy: {
		key: 'privacy',
		eyebrow: 'Privacy',
		title: 'Privacy Policy',
		description: 'How Nordic Solutions LLC handles personal information through this website.',
		intro:
			'This Privacy Policy explains how Nordic Solutions LLC handles personal information when you visit this website or contact us through the website form.',
		updatedLabel,
		sections: [
			{
				id: 'who-we-are',
				heading: '1. Who we are and how to contact us',
				paragraphs: [
					'Nordic Solutions LLC is the operator of this website and is the controller of the personal information described in this policy. Our business address is Tawazun Industrial Park, P.O. Box 3640, Abu Dhabi, United Arab Emirates.',
					'We handle personal information in accordance with Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the "PDPL") and other applicable laws of the United Arab Emirates.',
					'For privacy questions or requests, contact info@nordicsolutions.ae, marking your message "Privacy request".'
				]
			},
			{
				id: 'information-we-collect',
				heading: '2. Information we collect',
				content: [
					{
						paragraph:
							'The website contact form may collect the following information when you choose to submit it:'
					},
					{
						bullets: [
							'Name',
							'Work email address',
							'Organization, if provided',
							'Your message or project enquiry'
						]
					},
					{
						paragraph:
							'When you visit the website, our hosting and security providers also process limited technical information needed to deliver and protect the site, such as your IP address, browser type and the time of your request.'
					},
					{
						paragraph:
							'Please do not send us sensitive personal data through this website, such as data revealing health, religious or political views, biometric data or criminal records.'
					}
				]
			},
			{
				id: 'how-we-use-information',
				heading: '3. How we use information, and on what basis',
				content: [
					{ paragraph: 'We use submitted information to:' },
					{
						bullets: [
							'Respond to an enquiry and continue a requested business conversation',
							'Understand the scope, timing, and contact details relevant to the enquiry',
							'Protect the form and website from abuse',
							'Comply with applicable legal or regulatory obligations'
						]
					},
					{ paragraph: 'We rely on the following bases under the PDPL:' },
					{
						bullets: [
							'Your consent, given when you choose to submit the form (Articles 4 and 6)',
							'Taking steps at your request with a view to concluding a contract (Article 4(9))',
							'Compliance with legal obligations that apply to us (Article 4(10))'
						]
					},
					{
						paragraph:
							'You may withdraw your consent at any time by contacting us. Withdrawal does not affect the lawfulness of processing carried out before it. We do not use your information for automated decision making or profiling and we do not sell it.'
					}
				]
			},
			{
				id: 'who-we-share-information-with',
				heading: '4. Who we share information with',
				paragraphs: [
					'When you submit the form, the message is sent to info@nordicsolutions.ae using the website hosting and mail transport needed to deliver it. Information may be shared with:',
					'We do not sell submitted contact information and do not share it for third-party marketing.'
				],
				bullets: [
					'Officers within Nordic Solutions who need it to respond to the enquiry',
					'Service providers in the information technology, hosting, security, and communications sectors that host, secure, or deliver the website and its messages, and that act on our instructions under written terms',
					'Professional advisers, and competent authorities or courts, where required by applicable law'
				]
			},
			{
				id: 'transfers-outside-the-uae',
				heading: '5. Transfers outside the UAE',
				paragraphs: [
					'Some of our hosting and mail providers may process information on servers located outside the United Arab Emirates. Where personal information is transferred outside the UAE, it is being done in accordance with Articles 22 and 23 of the PDPL and that is to a country recognised as providing an adequate level of protection or under contractual terms requiring the recipient to apply protections equivalent to those required by the PDPL, or with your explicit consent. You may ask us for details of the safeguards applied.'
				]
			},
			{
				id: 'retention-and-security',
				heading: '6. Retention and security',
				paragraphs: [
					'The website does not store contact submissions in a database or local application log. Delivered correspondence is kept in the company mailbox for as long as needed to manage the relationship, and in any event no longer than 24 months after our last contact with you, unless a longer period is needed to meet a legal obligation or to establish, exercise, or defend a legal claim. We then delete or anonymise it.',
					'We apply technical and organisational measures appropriate to the risk, including encryption of the connection to the website, access controls limiting access to authorised personnel, form validation, and rate limiting. Short-lived hashed IP counters are used to limit repeated submissions and are not part of the public page content. No security measure can guarantee absolute protection.',
					'If a personal data breach occurs that would prejudice the privacy, confidentiality, or security of your personal information, we will notify the UAE Data Office, established under Federal Decree-Law No. 44 of 2021, and, where required, you, in accordance with Article 9 of the PDPL.'
				]
			},
			{
				id: 'cookies-and-tracking',
				heading: '7. Cookies and tracking',
				paragraphs: [
					'The current website does not use non-essential analytics, advertising pixels, or marketing cookies. Browser and hosting features that are strictly necessary to deliver the site may still process basic technical request information. If we introduce non-essential cookies or analytics, we will update this policy.'
				]
			},
			{
				id: 'children',
				heading: '8. Children',
				paragraphs: [
					'This website is directed at business users and is not intended for children. We do not knowingly collect personal information from anyone under 18. If you believe a child has provided us with personal information, please contact us and we will delete it.'
				]
			},
			{
				id: 'your-rights',
				heading: '9. Your rights',
				paragraphs: [
					'Subject to the PDPL and other applicable law, you may ask us to:',
					'To make a request, contact info@nordicsolutions.ae. We may need to verify your identity before acting on a request. There is no charge, and we aim to respond within 30 days. If you are not satisfied with our response, you may complain to the UAE Data Office.'
				],
				bullets: [
					'Give you information about the personal data we process, the purposes, who we share it with, how long we keep it, and the safeguards applied to transfers outside the UAE',
					'Correct or complete inaccurate or incomplete personal information',
					'Erase your personal information',
					'Restrict or stop processing, including stopping any direct marketing',
					'Provide the information you gave us in a structured, machine-readable format or transfer it to another controller where technically feasible',
					'Withdraw a consent you have given'
				]
			},
			{
				id: 'visitors-in-the-european-union',
				heading: '10. Visitors in the European Union',
				paragraphs: [
					'This website is directed at business users in the United Arab Emirates and the wider region. We do not target, or monitor the behaviour of, individuals in the European Union. Where the EU General Data Protection Regulation nonetheless applies to our processing of your personal information, the bases described at clause 3 correspond to Articles 6(1)(a), 6(1)(b) and 6(1)(c) of that Regulation, you have the equivalent rights described in clause 9 under Articles 15 to 21, and you may also lodge a complaint with the data protection supervisory authority in your country of residence or place of work.'
				]
			},
			{
				id: 'changes-and-contact',
				heading: '11. Changes and contact',
				paragraphs: [
					'We may update this policy when the website, contact process, or legal requirements change. The effective date at the top of this page identifies the current version.',
					'Questions about this policy can be sent to info@nordicsolutions.ae, or to Nordic Solutions LLC, Tawazun Industrial Park, P.O. Box 3640, Abu Dhabi, United Arab Emirates.'
				]
			}
		]
	},
	terms: {
		key: 'terms',
		eyebrow: 'Legal',
		title: 'Terms of Use',
		description: 'Terms that apply when you use the Nordic Solutions website and contact form.',
		intro:
			'These Terms of Use set the basic conditions for using the Nordic Solutions website and its contact form.',
		updatedLabel,
		sections: [
			{
				id: 'who-we-are-and-your-acceptance',
				heading: '1. Who we are, and your acceptance',
				paragraphs: [
					'This website is operated by Nordic Solutions LLC, a limited liability company registered in the United Arab Emirates, whose business address is Tawazun Industrial Park, P.O. Box 3640, Abu Dhabi, United Arab Emirates ("Nordic Solutions", "we", "us"). By accessing or using this website, or by submitting an enquiry through it, you accept these Terms of Use and the Privacy Policy, which forms part of them. If you do not accept them, please do not use the website. The website is intended for business users aged 18 or over.'
				]
			},
			{
				id: 'website-purpose',
				heading: '2. Website purpose',
				paragraphs: [
					'This website presents Nordic Solutions LLC, its capabilities, and ways to make an initial enquiry. Website information is general and does not create a proposal, engagement, warranty, or other binding commitment unless the parties agree separately in writing.'
				]
			},
			{
				id: 'acceptable-use',
				heading: '3. Acceptable use',
				paragraphs: ['You agree to use the website lawfully and not to:'],
				bullets: [
					'Attempt to gain unauthorised access to the website, endpoint, or hosting environment',
					"Submit malicious code, unlawful material, or another person's information without permission",
					"Interfere with availability, security, or another visitor's use of the website",
					'Use the contact form for unsolicited bulk messages or automated abuse',
					'Copy, scrape, or extract content or data from the website by automated means without our written permission',
					'Use the website in any way that breaches applicable law, including export control, sanctions, and anti-bribery law'
				]
			},
			{
				id: 'intellectual-property',
				heading: '4. Intellectual property',
				paragraphs: [
					'Unless stated otherwise, the website design, text, branding, and other materials are owned by or used with permission by Nordic Solutions LLC. You may view the website for legitimate business or informational purposes. You may not reproduce, modify, distribute, or commercially exploit its content without permission, except where applicable law allows it. Nothing on the website grants you any right or licence in our trade marks, trade names or logos.'
				]
			},
			{
				id: 'enquiries-and-submissions',
				heading: '5. Enquiries and submissions',
				paragraphs: [
					"You are responsible for providing accurate information that you are authorised to share. Where an enquiry includes personal information about another person, you confirm that you have that person's consent, or another lawful basis to share it with us.",
					'Submitting an enquiry does not guarantee a response, availability, acceptance of work, or formation of a contract. Please do not send confidential or proprietary information through the contact form. If you send us feedback or suggestions about the website or our services, you grant us a non-exclusive, royalty-free right to use them for our business purposes.',
					'Personal information submitted through the form is handled as described in the Privacy Policy.'
				]
			},
			{
				id: 'availability-accuracy-and-liability',
				heading: '6. Availability, accuracy, and liability',
				paragraphs: [
					'We aim to keep the website available and accurate, but the website and its content are provided "as is" and "as available", and the website may be changed, interrupted, or unavailable without notice. We give no warranty that the website will be uninterrupted, error-free, or free of harmful components, and no warranty as to the accuracy or completeness of its content.',
					'To the extent permitted by applicable law, Nordic Solutions LLC is not responsible for indirect, incidental, or consequential loss, or for loss of profit, revenue, business, goodwill, or data, arising from use of, or reliance on, the website. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including liability for death or personal injury caused by negligence, or for fraud.'
				]
			},
			{
				id: 'external-services',
				heading: '7. External services',
				paragraphs: [
					"The website may refer to contact channels or services operated by third parties. Their availability and terms are outside Nordic Solutions' control, and you should review their own policies before using them."
				]
			},
			{
				id: 'governing-law-and-jurisdiction',
				heading: '8. Governing law and jurisdiction',
				paragraphs: [
					'These Terms of Use, and any dispute or claim arising out of or in connection with them or with your use of the website, are governed by the federal laws of the United Arab Emirates and the laws of the Emirate of Abu Dhabi. The courts of the Emirate of Abu Dhabi have exclusive jurisdiction, subject to any mandatory rules that apply.'
				]
			},
			{
				id: 'general-changes-and-contact',
				heading: '9. General, changes and contact',
				paragraphs: [
					'If any provision of these terms is held invalid or unenforceable, the remaining provisions continue in full force and effect. A failure to enforce a provision is not a waiver of it.',
					'We may update these terms when the website or its use changes. The effective date at the top of this page identifies the current version, and the version published on the website at the time of your use applies. Where these terms are published in both English and Arabic and there is any discrepancy, the Arabic version prevails.',
					'Questions can be sent to info@nordicsolutions.ae, or to Nordic Solutions LLC, Tawazun Industrial Park, P.O. Box 3640, Abu Dhabi, United Arab Emirates.'
				]
			}
		]
	}
};

export const getLegalDocument = (key: LegalDocumentKey): LegalDocument => documents[key];

export const getLegalPath = (key: LegalDocumentKey): string => `/${key}`;

export const legalLinkLabels = {
	en: { privacy: 'Privacy Policy', terms: 'Terms of Use' },
	ar: { privacy: 'سياسة الخصوصية', terms: 'شروط الاستخدام' }
} as const;
