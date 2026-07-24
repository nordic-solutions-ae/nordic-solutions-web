import type { Locale } from '$lib/modules/i18n';

export type ValuePillar = {
	title: string;
	description: string;
};

export type ServiceHighlight = {
	title: string;
	description: string;
};

export type ProofCard = {
	title: string;
	description: string;
};

export type CompanyStat = {
	label: string;
	value: string;
};

export type ApproachPhase = {
	step: string;
	title: string;
	description: string;
};

export type SectionIntroCopy = {
	eyebrow: string;
	title: string;
	description: string;
};

export type HomeCopy = {
	meta: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
	};
	header: {
		contact: string;
		contactLong: string;
		openMenu: string;
		closeMenu: string;
		languageToggle: string;
	};
	hero: {
		eyebrow: string;
		titleLines: string[];
		lead: string;
		primaryCta: string;
		secondaryCta: string;
		signalsLabel: string;
		stats: CompanyStat[];
		visualEyebrow: string;
		visualTitle: string;
		visualText: string;
		visualAlt: string;
	};
	about: SectionIntroCopy & {
		intro: string[];
		imageAlt: string;
		caption: string;
		values: ValuePillar[];
	};
	services: SectionIntroCopy & {
		imageAlt: string;
		caption: string;
		items: ServiceHighlight[];
		ariaLabel: string;
	};
	approach: SectionIntroCopy & {
		items: ApproachPhase[];
		footprintLabel: string;
		footprint: string[];
		boundaryLabel: string;
		boundaryText: string;
		imageAlt: string;
		caption: string;
	};
	why: SectionIntroCopy & {
		items: ProofCard[];
		signals: string[];
		reviewLabel: string;
		reviewTitle: string;
		reviewItems: string[];
		reviewAriaLabel: string;
	};
	presence: SectionIntroCopy & {
		visualAlt: string;
		chipOne: string;
		chipTwo: string;
		copyTitle: string;
		body: string[];
	};
	contact: {
		eyebrow: string;
		title: string;
		description: string;
		details: {
			email: string;
			phone: string;
			address: string;
		};
		formContext: string;
		fields: {
			name: { label: string; helper: string; placeholder: string };
			email: { label: string; helper: string; placeholder: string };
			organization: { label: string; helper: string; placeholder: string };
			message: { label: string; helper: string; placeholder: string };
		};
		errors: {
			generic: string;
			reachByEmail: string;
			or: string;
			call: string;
		};
		button: {
			idle: string;
			submitting: string;
		};
	};
	footer: {
		eyebrow: string;
		headline: string;
		intro: string;
		brief: string;
		explore: string;
		reach: string;
		rights: string;
		tagline: string;
	};
};

export const siteAssetPaths = {
	logo: '/Nordic_Solutions_Logo_Red.svg',
	logoFooter: '/Nordic_Solutions_Logo_Dark.svg'
} as const;

const image = (file: string, width: number, height: number) => ({
	src: `/images/generated-scenes/${file}`,
	width,
	height
});

export const siteAssetSets = {
	heroPartners: image('placeholder_00009.webp', 1400, 934),
	aboutRegion: image('placeholder_00007.webp', 1400, 1045),
	servicesReview: image('placeholder_00004.webp', 1400, 792),
	approachPartnership: image('placeholder_00002.webp', 1600, 770)
};

export const presenceImage = image('placeholder_00011.webp', 1400, 1046);

export const valuePillars: ValuePillar[] = [
	{
		title: 'Careful positioning',
		description:
			'Public messaging stays broad, professional, and appropriate for institutional review.'
	},
	{
		title: 'Clear delivery roles',
		description:
			'Engagements are shaped around clear responsibilities, partner fit, and practical follow-through.'
	},
	{
		title: 'Long-term partnership',
		description:
			'The work is oriented toward durable relationships rather than short-term transactional wins.'
	}
];

export const companyStats: CompanyStat[] = [
	{ label: 'UAE presence', value: 'Abu Dhabi operating base' },
	{ label: 'Engagement', value: 'Private partner review' },
	{ label: 'Scope', value: 'Industrial project support' },
	{ label: 'Standard', value: 'Accountable follow-through' }
];

export const serviceHighlights: ServiceHighlight[] = [
	{
		title: 'Strategic project development',
		description:
			'Clarifying objectives, stakeholders, and project logic before commitments are shaped.'
	},
	{
		title: 'Industrial partnerships',
		description:
			'Building collaboration models between local priorities and qualified international partners.'
	},
	{
		title: 'Technology integration',
		description:
			'Coordinating technical, commercial, and implementation requirements into one workable path.'
	},
	{
		title: 'Implementation support',
		description:
			'Keeping timelines, responsibilities, and communication cadence clear through delivery.'
	}
];

export const approachPhases: ApproachPhase[] = [
	{
		step: '01',
		title: 'Assess',
		description: 'Clarify the brief, decision context, stakeholders, and practical constraints.'
	},
	{
		step: '02',
		title: 'Structure',
		description: 'Define the partnership model, operating responsibilities, and work plan.'
	},
	{
		step: '03',
		title: 'Coordinate',
		description:
			'Align local stakeholders, international partners, timing, and communication loops.'
	},
	{
		step: '04',
		title: 'Support',
		description:
			'Maintain delivery discipline through follow-up, accountability, and ongoing engagement.'
	}
];

export const whyChooseNordic: ProofCard[] = [
	{
		title: 'International outlook',
		description:
			'Regional understanding is paired with cross-border project experience and partner access.'
	},
	{
		title: 'Disciplined delivery',
		description:
			'Work is organized around clear stages, practical responsibilities, and disciplined follow-through.'
	},
	{
		title: 'Reserved public profile',
		description:
			'The company can communicate credibility without turning the website into a public catalogue.'
	},
	{
		title: 'Long-term mindset',
		description:
			'Partnerships are framed for continuity, trust, and responsible follow-through over time.'
	}
];

export const contactDetails = {
	company: 'Nordic Solutions LLC',
	email: 'info@nordicsolutions.ae',
	phone: '+971503160500',
	addressLine1: 'Tawazun Industrial Park, Abu Dhabi, UAE',
	addressLine2: 'P.O. Box: 3640'
} as const;

export const regionalFootprint = [
	'UAE-based industrial initiatives',
	'Cross-border industrial partnerships',
	'Technology integration planning',
	'Commercial project support'
];

const englishHomeCopy: HomeCopy = {
	meta: {
		title: 'Nordic Solutions | Strategic Project Support',
		description:
			'Nordic Solutions supports UAE-focused industrial partnerships, technology integration, and disciplined project execution.',
		ogTitle: 'Nordic Solutions',
		ogDescription:
			'Abu Dhabi project support for strategic partnerships, technology integration, and careful execution.'
	},
	header: {
		contact: 'Contact',
		contactLong: 'Contact Nordic',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		languageToggle: 'العربية'
	},
	hero: {
		eyebrow: 'International project support',
		titleLines: ['Strategic support', 'for complex', 'international projects.'],
		lead: 'Nordic Solutions supports technology integration, industrial partnerships, and disciplined execution from Abu Dhabi for organizations that need careful handling.',
		primaryCta: 'Start a Conversation',
		secondaryCta: 'Explore Capabilities',
		signalsLabel: 'Operating signals',
		stats: companyStats,
		visualEyebrow: 'Abu Dhabi base',
		visualTitle: 'Local relevance with global partner access.',
		visualText: 'Project shaping, partner alignment, and accountable follow-through.',
		visualAlt: 'Nordic Solutions corporate project support visual'
	},
	about: {
		eyebrow: 'Who We Are',
		title: 'An Abu Dhabi partner for careful cross-border work.',
		description:
			'Nordic Solutions combines local business context, international partner access, and practical support for complex project work.',
		intro: [
			'Nordic Solutions LLC was established to support high-accountability projects where trust, clear roles, and disciplined execution matter from the first conversation.',
			'The company works as a bridge between regional priorities and qualified international partners, keeping public positioning clear, credible, and appropriately reserved.'
		],
		imageAlt: 'Nordic Solutions regional business context visual',
		caption: 'Regional view, considered through a long-term lens.',
		values: valuePillars
	},
	services: {
		eyebrow: 'How We Help',
		title: 'Capabilities presented clearly and with restraint.',
		description: 'The public story stays high-level while still showing a real operating model.',
		imageAlt: 'Nordic Solutions technical and delivery review visual',
		caption: 'Technical and delivery inputs reviewed without public partner detail.',
		items: serviceHighlights,
		ariaLabel: 'Core capabilities'
	},
	approach: {
		eyebrow: 'Approach',
		title: 'A simple operating rhythm for complex work.',
		description: 'Each engagement moves from assessment to clear roles and accountable support.',
		items: approachPhases,
		footprintLabel: 'Operating footprint',
		footprint: regionalFootprint,
		boundaryLabel: 'Public / private boundary',
		boundaryText:
			'Public materials describe the operating model at a high level. Specific partners, project scopes, and transaction details are handled through direct engagement.',
		imageAlt: 'Nordic Solutions partner workstream planning visual',
		caption: 'Partner roles and workstreams shaped before commitments move forward.'
	},
	why: {
		eyebrow: 'Why Nordic',
		title: 'Why organizations start the conversation.',
		description:
			'Nordic Solutions is positioned for work that requires judgement, clear responsibilities, and cross-border partner access.',
		items: whyChooseNordic,
		signals: [
			'Market context',
			'Delivery control',
			'Reserved public profile',
			'Relationship continuity'
		],
		reviewLabel: 'Review posture',
		reviewTitle: 'Credibility without turning the site into a catalogue.',
		reviewItems: [
			'Clear public positioning for institutional checks',
			'Broad capability language instead of sensitive operational detail',
			'Direct engagement for partner, project, and transaction specifics'
		],
		reviewAriaLabel: 'Institutional review posture'
	},
	presence: {
		eyebrow: 'Presence',
		title: 'Regional presence, kept close to the work.',
		description:
			'From Abu Dhabi, Nordic Solutions connects domestic priorities with qualified international partners through a measured, locally grounded operating model.',
		visualAlt: 'Nordic Solutions regional presence visual',
		chipOne: 'UAE base',
		chipTwo: 'Partner access',
		copyTitle: 'Local relevance with international reach.',
		body: [
			'The company supports early alignment, partner qualification, and practical collaboration without turning every engagement into a public signal.',
			'That position helps clients move from market scanning to partnership design while retaining strategic control.'
		]
	},
	contact: {
		eyebrow: 'Contact',
		title: 'Start with the brief, the timeline, and the partner profile you need.',
		description:
			'Share the operational need, the intended timeline, and the kind of industrial or technical support you are evaluating. Nordic Solutions can then respond with the right next step.',
		details: {
			email: 'Email',
			phone: 'Phone',
			address: 'Address'
		},
		formContext:
			'Qualified project, partnership, and implementation enquiries. Keep sensitive detail for direct channels.',
		fields: {
			name: {
				label: 'Name',
				helper: 'Professional name.',
				placeholder: 'Full name'
			},
			email: {
				label: 'Work Email',
				helper: 'Work or institutional address.',
				placeholder: 'name@organization.com'
			},
			organization: {
				label: 'Organization',
				helper: 'Entity name if relevant.',
				placeholder: 'Organization name'
			},
			message: {
				label: 'Brief Message',
				helper: 'Scope, timing, location, constraints.',
				placeholder: 'Scope, timeline, location, and required support'
			}
		},
		errors: {
			generic:
				'Some intake details need attention. Review the highlighted fields and submit again.',
			reachByEmail: 'Email',
			or: 'or',
			call: 'call'
		},
		button: {
			idle: 'Send Request',
			submitting: 'Checking Request'
		}
	},
	footer: {
		eyebrow: 'Nordic Solutions',
		headline: 'We stay close to the brief, the partner landscape, and the delivery reality.',
		intro:
			'Practical support for strategic partnerships, technology integration, and long-range industrial projects in the UAE.',
		brief:
			'Company profile, engagement context, and project detail are shared through direct review.',
		explore: 'Explore',
		reach: 'Reach Us',
		rights: 'All rights reserved.',
		tagline: 'Built for high-trust strategic engagement.'
	}
};

export const homeCopy: Record<Locale, HomeCopy> = {
	en: englishHomeCopy,
	ar: {
		meta: {
			title: 'Nordic Solutions | دعم المشاريع الاستراتيجية',
			description:
				'تدعم Nordic Solutions الشراكات الصناعية في دولة الإمارات، وتكامل التكنولوجيا، وتنفيذ المشاريع بانضباط.',
			ogTitle: 'Nordic Solutions',
			ogDescription: 'دعم من أبوظبي للشراكات الاستراتيجية وتكامل التكنولوجيا والتنفيذ المنضبط.'
		},
		header: {
			contact: 'تواصل',
			contactLong: 'تواصل مع Nordic',
			openMenu: 'فتح القائمة',
			closeMenu: 'إغلاق القائمة',
			languageToggle: 'English'
		},
		hero: {
			eyebrow: 'دعم المشاريع الدولية',
			titleLines: ['دعم استراتيجي', 'للمشاريع الدولية', 'المعقدة.'],
			lead: 'تدعم Nordic Solutions تكامل التكنولوجيا والشراكات الصناعية والتنفيذ المنضبط من أبوظبي للجهات التي تحتاج إلى تعامل دقيق.',
			primaryCta: 'ابدأ المحادثة',
			secondaryCta: 'استكشف القدرات',
			signalsLabel: 'مؤشرات التشغيل',
			stats: [
				{ label: 'حضور الإمارات', value: 'قاعدة تشغيلية في أبوظبي' },
				{ label: 'التعامل', value: 'مراجعة شركاء خاصة' },
				{ label: 'النطاق', value: 'دعم مشاريع صناعية' },
				{ label: 'المعيار', value: 'متابعة مسؤولة' }
			],
			visualEyebrow: 'قاعدة أبوظبي',
			visualTitle: 'صلة محلية مع وصول إلى شركاء عالميين.',
			visualText: 'صياغة المشاريع ومواءمة الشركاء والمتابعة المسؤولة.',
			visualAlt: 'صورة مؤسسية لدعم المشاريع في Nordic Solutions'
		},
		about: {
			eyebrow: 'من نحن',
			title: 'شريك في أبوظبي للعمل العابر للحدود بعناية.',
			description:
				'تجمع Nordic Solutions بين فهم سياق الأعمال المحلي والوصول إلى الشركاء الدوليين والدعم العملي للمشاريع المعقدة.',
			intro: [
				'تأسست Nordic Solutions LLC لدعم المشاريع عالية المسؤولية التي تتطلب الثقة ووضوح الأدوار والتنفيذ المنضبط منذ المحادثة الأولى.',
				'تعمل الشركة كحلقة وصل بين الأولويات الإقليمية والشركاء الدوليين المؤهلين، مع إبقاء الحضور العام واضحا ومهنيا ومتحفظا بالقدر المناسب.'
			],
			imageAlt: 'صورة لسياق الأعمال الإقليمي في Nordic Solutions',
			caption: 'رؤية إقليمية بمنظور طويل الأمد.',
			values: [
				{
					title: 'تموضع دقيق',
					description: 'تبقى الرسائل العامة واسعة ومهنية ومناسبة للمراجعة المؤسسية.'
				},
				{
					title: 'أدوار تنفيذ واضحة',
					description: 'تتشكل الأعمال حول مسؤوليات واضحة وملاءمة الشركاء والمتابعة العملية.'
				},
				{
					title: 'شراكة طويلة الأمد',
					description: 'يتجه العمل نحو علاقات مستدامة بدلا من المكاسب القصيرة.'
				}
			]
		},
		services: {
			eyebrow: 'كيف نساعد',
			title: 'قدرات واضحة وبأسلوب متحفظ.',
			description: 'يبقى العرض العام عالي المستوى مع إظهار نموذج عمل حقيقي.',
			imageAlt: 'صورة لمراجعة فنية وتنفيذية في Nordic Solutions',
			caption: 'مراجعة المدخلات الفنية والتنفيذية دون تفاصيل شركاء عامة.',
			items: [
				{
					title: 'تطوير المشاريع الاستراتيجية',
					description: 'توضيح الأهداف وأصحاب المصلحة ومنطق المشروع قبل تشكيل الالتزامات.'
				},
				{
					title: 'الشراكات الصناعية',
					description: 'بناء نماذج تعاون بين الأولويات المحلية والشركاء الدوليين المؤهلين.'
				},
				{
					title: 'تكامل التكنولوجيا',
					description: 'تنسيق المتطلبات الفنية والتجارية والتنفيذية ضمن مسار عملي واحد.'
				},
				{
					title: 'دعم التنفيذ',
					description: 'الحفاظ على وضوح الجداول والمسؤوليات وإيقاع التواصل أثناء التسليم.'
				}
			],
			ariaLabel: 'القدرات الأساسية'
		},
		approach: {
			eyebrow: 'النهج',
			title: 'إيقاع عمل بسيط للمشاريع المعقدة.',
			description: 'ينتقل كل تعامل من التقييم إلى أدوار واضحة ودعم مسؤول.',
			items: [
				{
					step: '01',
					title: 'التقييم',
					description: 'توضيح الموجز وسياق القرار وأصحاب المصلحة والقيود العملية.'
				},
				{
					step: '02',
					title: 'الهيكلة',
					description: 'تحديد نموذج الشراكة ومسؤوليات التشغيل وخطة العمل.'
				},
				{
					step: '03',
					title: 'التنسيق',
					description: 'مواءمة أصحاب المصلحة المحليين والشركاء الدوليين والتوقيت والتواصل.'
				},
				{
					step: '04',
					title: 'الدعم',
					description: 'الحفاظ على الانضباط من خلال المتابعة والمساءلة والتواصل المستمر.'
				}
			],
			footprintLabel: 'النطاق التشغيلي',
			footprint: [
				'مبادرات صناعية مقرها الإمارات',
				'شراكات صناعية عابرة للحدود',
				'تخطيط تكامل التكنولوجيا',
				'دعم المشاريع التجارية'
			],
			boundaryLabel: 'الحد العام / الخاص',
			boundaryText:
				'تصف المواد العامة نموذج العمل على مستوى عال. أما الشركاء ونطاقات المشاريع والتفاصيل الحساسة فتتم مناقشتها مباشرة.',
			imageAlt: 'صورة لتخطيط مسارات العمل والشراكات في Nordic Solutions',
			caption: 'تتشكل أدوار الشركاء ومسارات العمل قبل الانتقال إلى الالتزامات.'
		},
		why: {
			eyebrow: 'لماذا Nordic',
			title: 'لماذا تبدأ المؤسسات المحادثة معنا.',
			description:
				'تتموضع Nordic Solutions للأعمال التي تتطلب حكما مهنيا ومسؤوليات واضحة ووصولا إلى شركاء عابرين للحدود.',
			items: [
				{
					title: 'منظور دولي',
					description: 'يقترن الفهم الإقليمي بخبرة في المشاريع العابرة للحدود والوصول إلى الشركاء.'
				},
				{
					title: 'تنفيذ منضبط',
					description: 'ينظم العمل حول مراحل واضحة ومسؤوليات عملية ومتابعة منضبطة.'
				},
				{
					title: 'حضور عام متحفظ',
					description: 'يمكن للشركة أن تبني المصداقية دون تحويل الموقع إلى كتالوج عام.'
				},
				{
					title: 'تفكير طويل الأمد',
					description: 'تصاغ الشراكات للاستمرارية والثقة والمتابعة المسؤولة مع الوقت.'
				}
			],
			signals: ['سياق السوق', 'ضبط التنفيذ', 'حضور متحفظ', 'استمرارية العلاقة'],
			reviewLabel: 'وضعية المراجعة',
			reviewTitle: 'مصداقية من دون تحويل الموقع إلى كتالوج.',
			reviewItems: [
				'تموضع عام واضح للمراجعات المؤسسية',
				'لغة قدرات واسعة بدلا من التفاصيل التشغيلية الحساسة',
				'تواصل مباشر لتفاصيل الشركاء والمشاريع والمعاملات'
			],
			reviewAriaLabel: 'وضعية المراجعة المؤسسية'
		},
		presence: {
			eyebrow: 'الحضور',
			title: 'حضور إقليمي قريب من العمل.',
			description:
				'من أبوظبي، تربط Nordic Solutions الأولويات المحلية بالشركاء الدوليين المؤهلين من خلال نموذج عمل مدروس ومرتبط بالسياق المحلي.',
			visualAlt: 'صورة للحضور الإقليمي في Nordic Solutions',
			chipOne: 'قاعدة الإمارات',
			chipTwo: 'وصول الشركاء',
			copyTitle: 'صلة محلية بمدى دولي.',
			body: [
				'تدعم الشركة المواءمة المبكرة وتأهيل الشركاء والتعاون العملي دون تحويل كل تعامل إلى إشارة عامة.',
				'يساعد هذا التموضع العملاء على الانتقال من مسح السوق إلى تصميم الشراكات مع الحفاظ على التحكم الاستراتيجي.'
			]
		},
		contact: {
			eyebrow: 'تواصل',
			title: 'ابدأ بالموجز والجدول الزمني ونوع الشريك المطلوب.',
			description:
				'شارك الحاجة التشغيلية والجدول المتوقع ونوع الدعم الصناعي أو الفني الذي تدرسه، لتتمكن Nordic Solutions من تحديد الخطوة التالية المناسبة.',
			details: {
				email: 'البريد الإلكتروني',
				phone: 'الهاتف',
				address: 'العنوان'
			},
			formContext:
				'استفسارات المشاريع والشراكات والتنفيذ المؤهلة. يرجى إبقاء التفاصيل الحساسة للقنوات المباشرة.',
			fields: {
				name: {
					label: 'الاسم',
					helper: 'الاسم المهني.',
					placeholder: 'الاسم الكامل'
				},
				email: {
					label: 'البريد الإلكتروني للعمل',
					helper: 'بريد العمل أو المؤسسة.',
					placeholder: 'name@organization.com'
				},
				organization: {
					label: 'المؤسسة',
					helper: 'اسم الجهة عند الحاجة.',
					placeholder: 'اسم المؤسسة'
				},
				message: {
					label: 'رسالة موجزة',
					helper: 'النطاق، التوقيت، الموقع، القيود.',
					placeholder: 'النطاق، الجدول الزمني، الموقع، والدعم المطلوب'
				}
			},
			errors: {
				generic: 'تحتاج بعض تفاصيل الطلب إلى مراجعة. تحقق من الحقول المحددة وأرسل مرة أخرى.',
				reachByEmail: 'راسل',
				or: 'أو',
				call: 'اتصل'
			},
			button: {
				idle: 'إرسال الطلب',
				submitting: 'جار التحقق من الطلب'
			}
		},
		footer: {
			eyebrow: 'Nordic Solutions',
			headline: 'نبقى قريبين من الموجز ومشهد الشركاء وواقع التنفيذ.',
			intro:
				'دعم عملي للشراكات الاستراتيجية وتكامل التكنولوجيا والمشاريع الصناعية طويلة المدى في دولة الإمارات.',
			brief: 'تتم مشاركة ملف الشركة وسياق العمل وتفاصيل المشروع من خلال مراجعة مباشرة.',
			explore: 'استكشف',
			reach: 'تواصل معنا',
			rights: 'جميع الحقوق محفوظة.',
			tagline: 'مصمم للتواصل الاستراتيجي عالي الثقة.'
		}
	}
};

export const getHomeCopy = (locale: Locale) => homeCopy[locale];
