function initializePage(renderPage) {
  const start = () => {
    initNavigation();
    initAgencyToast();
    if (renderPage) renderPage();
    initRevealObserver();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}

const TREATMENTS = [
  {
    id: 'wrinkle-relaxing',
    slug: 'wrinkle-relaxing',
    name: 'Wrinkle Relaxing Consultation',
    category: 'Injectables',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Tailored consult for softening expression lines and refining facial balance.',
    fullDescription: 'This consultation covers a considered assessment of facial movement and treatment goals, with an emphasis on natural-looking balance and a tailored, gradual approach. It is designed for individuals wanting to explore options for softening lines while preserving expression. Treatments involving prescription products or injectable procedures require assessment by an appropriately qualified practitioner.',
    skinConcerns: ['Fine lines', 'General skin maintenance'],
    treatmentDuration: '30-45 minutes',
    durationMinutes: 45,
    startingPrice: 150,
    priceBand: '$100–$250',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Adults seeking a considered treatment plan',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: true,
    rating: 4.9,
    reviewCount: 84,
    benefits: ['Natural-looking softening of expression lines', 'Personalized treatment planning', 'Detailed aftercare guidance'],
    process: ['In-depth consultation and facial assessment', 'Treatment plan recommendation and approval', 'Aftercare review and follow-up guidance'],
    aftercare: ['Avoid touch or pressure on the treated area for a few hours', 'Gentle skincare and sun protection recommended', 'Follow any practitioner instructions before returning to usual activity'],
    faqs: [
      { question: 'Is this treatment right for first-time clients?', answer: 'This is commonly explored by first-time clients, but suitability is always determined by a qualified practitioner during consultation.' },
      { question: 'How long does it last?', answer: 'Results vary and may be temporary; a clinician can advise on expected timeline and review windows.' }
    ],
    relatedTreatmentIds: ['dermal-filler', 'skin-resurfacing'],
    provider: 'Medical aesthetics practitioner',
    reviewText: 'Thoughtful and consultative.'
  },
  {
    id: 'dermal-filler',
    slug: 'dermal-filler',
    name: 'Dermal Filler Consultation',
    category: 'Injectables',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Consultation to discuss facial contouring, hydration support and subtle enhancement.',
    fullDescription: 'This tailored consultation is designed to discuss volume support, skin hydration goals and balance within the facial features. It is intended as a way to understand treatment options, expected outcomes and realistic treatment planning. Injectable treatments require professional assessment, and suitability depends on individual anatomy and clinical context.',
    skinConcerns: ['Fine lines', 'General skin maintenance'],
    treatmentDuration: '45-60 minutes',
    durationMinutes: 60,
    startingPrice: 280,
    priceBand: '$250–$500',
    downtime: 'Short recovery',
    suitableFor: 'Clients seeking structured facial volume planning',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: true,
    rating: 4.8,
    reviewCount: 71,
    benefits: ['Subtle enhancement planning', 'Balanced facial contour assessment', 'Clear follow-up guidance'],
    process: ['Clinical assessment and goals discussion', 'Review of product suitability and treatment strategy', 'Aftercare and review planning'],
    aftercare: ['Avoid strenuous activity for the first day', 'Use gentle skincare and sun protection', 'Arrange a review if you have concerns'],
    faqs: [
      { question: 'Does this require a consultation?', answer: 'Yes. This discussion is part of a clinical assessment, and a practitioner will confirm suitability.' },
      { question: 'Can results appear very subtle?', answer: 'Yes, many clients prefer a soft and natural-looking outcome with a measured, stepwise approach.' }
    ],
    relatedTreatmentIds: ['wrinkle-relaxing', 'radiofrequency-skin'],
    provider: 'Medical aesthetics clinician',
    reviewText: 'Very considered and reassuring.'
  },
  {
    id: 'microneedling',
    slug: 'microneedling',
    name: 'Microneedling',
    category: 'Skin Rejuvenation',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Stimulating skin renewal process for tone, texture and overall radiance.',
    fullDescription: 'Microneedling uses controlled micro-injuries to encourage the skin’s natural renewal cycle and help improve the appearance of texture, tone and general radiance. This treatment is designed around a professional assessment and may be tailored depending on skin condition, complexion and overall goals. It is not a guarantee of specific results and requires an appropriate consultation.',
    skinConcerns: ['Texture', 'Uneven tone', 'Dehydration'],
    treatmentDuration: '45-60 minutes',
    durationMinutes: 60,
    startingPrice: 220,
    priceBand: '$250–$500',
    downtime: 'Short recovery',
    suitableFor: 'Clients seeking a resurfacing-style refresh',
    providerType: 'Aesthetician',
    consultationRequired: true,
    availability: 'Appointment request available',
    featured: true,
    rating: 4.7,
    reviewCount: 66,
    benefits: ['Supports smoother-looking skin texture', 'Encourages a brighter, more even appearance', 'Works well as part of a broader skin plan'],
    process: ['Skin analysis and preparation', 'Microneedling treatment with appropriate settings', 'Post-treatment care review'],
    aftercare: ['Avoid heat, sweating and active skincare for 24-48 hours', 'Use a gentle cleanser and SPF protection', 'Follow any specific aftercare instructions provided'],
    faqs: [
      { question: 'How many sessions might be suggested?', answer: 'A course may be recommended based on skin goals, though this depends on the individual and their consultation.' },
      { question: 'Is there downtime?', answer: 'Mild redness or temporary sensitivity can be expected, with the extent varying by skin and treatment intensity.' }
    ],
    relatedTreatmentIds: ['chemical-peels', 'radiofrequency-skin'],
    provider: 'Skin therapist',
    reviewText: 'My skin looked more luminous after a few days.'
  },
  {
    id: 'chemical-peels',
    slug: 'chemical-peels',
    name: 'Chemical Peels',
    category: 'Skin Rejuvenation',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Layered resurfacing solution to help soften roughness and rejuvenate texture.',
    fullDescription: 'Chemical peels are used to encourage skin renewal and can be tailored to a range of concerns such as rough texture, dullness and uneven tone. These treatments require a proper professional assessment to determine appropriate strength and frequency. The treatment plan and expected skin response vary from person to person.',
    skinConcerns: ['Uneven tone', 'Texture', 'Congestion'],
    treatmentDuration: '30-45 minutes',
    durationMinutes: 45,
    startingPrice: 180,
    priceBand: '$100–$250',
    downtime: 'Short recovery',
    suitableFor: 'Clients seeking a refined resurfacing treatment',
    providerType: 'Aesthetician',
    consultationRequired: true,
    availability: 'Appointment request available',
    featured: false,
    rating: 4.6,
    reviewCount: 52,
    benefits: ['Helps smooth rough-looking texture', 'Refreshes dull skin appearance', 'Can support a more balanced glow'],
    process: ['Skin assessment and treatment selection', 'Application of peel solution and neutralization', 'Finish with calming post-treatment care'],
    aftercare: ['Avoid harsh exfoliants for several days', 'Moisturize and use SPF daily', 'Allow skin to recover gradually'],
    faqs: [
      { question: 'Is it suitable for sensitive skin?', answer: 'Not always. A practitioner will consider skin sensitivity and treatment intensity before recommending it.' },
      { question: 'How often can it be repeated?', answer: 'Frequency depends on the exfoliation level, skin response and clinician guidance.' }
    ],
    relatedTreatmentIds: ['microneedling', 'ipl-skin'],
    provider: 'Skin specialist',
    reviewText: 'Great for a brighter finish.'
  },
  {
    id: 'hydrating-facial',
    slug: 'hydrating-facial',
    name: 'Hydrating Facial',
    category: 'Facials',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Comforting, moisture-rich facial treatment for a fresh, plump dewy finish.',
    fullDescription: 'A hydrating facial is designed to deliver comforting moisture support, improve the skin’s appearance of suppleness and leave the skin feeling replenished. This treatment is often chosen as a maintenance step for dehydrated or stressed skin and may be adapted depending on sensitivity and goals. It is not a medical treatment and outcomes vary by skin type.',
    skinConcerns: ['Dehydration', 'General skin maintenance'],
    treatmentDuration: '45 minutes',
    durationMinutes: 45,
    startingPrice: 120,
    priceBand: '$100–$250',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Clients wanting hydration support and comfort',
    providerType: 'Aesthetician',
    consultationRequired: false,
    availability: 'Appointment request available',
    featured: true,
    rating: 4.9,
    reviewCount: 98,
    benefits: ['Boosts hydration', 'Supports skin comfort', 'Refines the look of tired skin'],
    process: ['Skin assessment and cleansing', 'Hydrating treatment and massage', 'Barrier-supporting finishing products'],
    aftercare: ['Apply SPF when heading outdoors', 'Avoid harsh exfoliants for a day or two', 'Maintain a gentle skincare routine'],
    faqs: [
      { question: 'Can it help with dryness?', answer: 'Yes, this facial is often chosen for dehydration support, although individual responses vary.' },
      { question: 'Is it good before a special event?', answer: 'It is often selected as a glow-boosting treatment before social occasions.' }
    ],
    relatedTreatmentIds: ['led-light-therapy', 'skin-consultation'],
    provider: 'Beauty therapist',
    reviewText: 'The hydration and glow were immediate.'
  },
  {
    id: 'deep-cleansing-facial',
    slug: 'deep-cleansing-facial',
    name: 'Deep Cleansing Facial',
    category: 'Facials',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Clarifying treatment designed to refresh congested, dull-looking skin.',
    fullDescription: 'A deep cleansing facial is often chosen as a reset for skin that feels congested, tired or more textured. It typically includes thorough cleansing, gentle exfoliation and targeted finishing steps to support a smoother and clearer-looking complexion. Suitability depends on skin sensitivity and should be discussed during your consultation.',
    skinConcerns: ['Congestion', 'Texture', 'Uneven tone'],
    treatmentDuration: '60 minutes',
    durationMinutes: 60,
    startingPrice: 160,
    priceBand: '$100–$250',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Clients seeking a refreshed complexion',
    providerType: 'Aesthetician',
    consultationRequired: false,
    availability: 'Appointment request available',
    featured: false,
    rating: 4.7,
    reviewCount: 61,
    benefits: ['Clarifies congested areas', 'Gives a fresh-feeling complexion', 'Helps support a smoother surface'],
    process: ['Cleansing and skin analysis', 'Clarifying exfoliation and treatment phase', 'Soothing finish and hydration'],
    aftercare: ['Be gentle with exfoliating acids after treatment', 'Use SPF each day', 'Keep skin well hydrated'],
    faqs: [
      { question: 'Is this a suitable treatment for oily skin?', answer: 'Often yes, but a practitioner should tailor the treatment approach based on your skin type and concerns.' },
      { question: 'Can it help with blackheads?', answer: 'It may support a clearer-looking complexion, though expectations should be aligned during consultation.' }
    ],
    relatedTreatmentIds: ['hydrating-facial', 'chemical-peels'],
    provider: 'Beauty therapist',
    reviewText: 'My skin felt clearer and calmer.'
  },
  {
    id: 'laser-hair-reduction',
    slug: 'laser-hair-reduction',
    name: 'Laser Hair Reduction',
    category: 'Laser Treatments',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Consultation and treatment planning for long-term hair reduction goals.',
    fullDescription: 'Laser hair reduction is a targeted treatment that seeks to reduce visible hair growth over time. This requires a professional assessment to confirm suitability, skin tone, treatment area and expected course of treatment. It is not a guarantee of permanent hair removal and results vary based on individual factors and hair growth patterns.',
    skinConcerns: ['Unwanted hair'],
    treatmentDuration: '30-60 minutes',
    durationMinutes: 60,
    startingPrice: 240,
    priceBand: '$250–$500',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Adults seeking a reduction in visible hair growth',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: false,
    rating: 4.8,
    reviewCount: 47,
    benefits: ['Potential reduction in visible hair growth', 'Convenient treatment planning', 'Customised treatment course'],
    process: ['Assessment and treatment area review', 'Laser session based on skin and hair characteristics', 'Follow-up plan and schedule review'],
    aftercare: ['Protect treated skin from heat and direct sun', 'Avoid picking or friction on the area', 'Attend recommended review sessions'],
    faqs: [
      { question: 'Do I need multiple sessions?', answer: 'Most clients do. The number of sessions depends on hair type, skin tone and treatment area.' },
      { question: 'Does it work for all skin tones?', answer: 'Suitability depends on skin and hair characteristics and should be assessed professionally.' }
    ],
    relatedTreatmentIds: ['ipl-skin', 'body-contouring'],
    provider: 'Medical laser specialist',
    reviewText: 'The consultation was very clear and professional.'
  },
  {
    id: 'ipl-skin',
    slug: 'ipl-skin',
    name: 'IPL Skin Treatments',
    category: 'Laser Treatments',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Light-based skin refinement for a more even-looking complexion.',
    fullDescription: 'IPL treatments are designed to support a more even-looking complexion by addressing visible changes in skin tone and brightness. A proper consultation is required to verify suitability, especially where pigmentation or sensitivity is involved. Responses vary and the treatment should be selected carefully based on skin type and history.',
    skinConcerns: ['Uneven tone', 'General skin maintenance'],
    treatmentDuration: '20-30 minutes',
    durationMinutes: 30,
    startingPrice: 190,
    priceBand: '$100–$250',
    downtime: 'Short recovery',
    suitableFor: 'Clients looking to refine skin brightness and tone',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: true,
    rating: 4.5,
    reviewCount: 39,
    benefits: ['Helps brighten skin appearance', 'Supports a more uniform tone', 'Tailored treatment planning'],
    process: ['Consultation and skin review', 'Activated light treatment', 'Recovery and aftercare guidance'],
    aftercare: ['Avoid sun exposure and use broad-spectrum SPF', 'Keep the skin cool and hydrated', 'Follow the recommended schedule'],
    faqs: [
      { question: 'Does it require a recovery time?', answer: 'There may be temporary warmth or mild redness, but downtime is commonly minimal.' },
      { question: 'Is it suitable for all skin types?', answer: 'No. Suitability depends on skin type, UV exposure and individual history.' }
    ],
    relatedTreatmentIds: ['laser-hair-reduction', 'skin-resurfacing'],
    provider: 'Laser clinician',
    reviewText: 'The tone looked noticeably smoother after a series.'
  },
  {
    id: 'radiofrequency-skin',
    slug: 'radiofrequency-skin',
    name: 'Radiofrequency Skin Treatment',
    category: 'Laser Treatments',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Collagen-supportive skin tightening treatment for statement of firmness and tone.',
    fullDescription: 'Radiofrequency treatments aim to support skin firmness and improve the look of mild laxity using controlled thermal stimulation. A consultation is recommended to determine whether this approach aligns with your goals, skin tolerance and treatment plan. The treatment is a non-surgical consideration and not a guarantee of dramatic changes.',
    skinConcerns: ['Fine lines', 'Texture', 'General skin maintenance'],
    treatmentDuration: '30-45 minutes',
    durationMinutes: 45,
    startingPrice: 210,
    priceBand: '$250–$500',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Clients wanting a non-invasive tightening option',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Appointment request available',
    featured: false,
    rating: 4.6,
    reviewCount: 44,
    benefits: ['Supports skin tightening appearance', 'Works well for maintenance plans', 'Comfortable in-clinic treatment'],
    process: ['Skin review and treatment planning', 'RF session with temperature monitoring', 'Aftercare and plan review'],
    aftercare: ['Use SPF and avoid excess heat for a short period', 'Hydrate skin post-treatment', 'Maintain the treatment plan with recommended follow-ups'],
    faqs: [
      { question: 'Is it painful?', answer: 'It is commonly described as a warm, tolerable sensation, though comfort varies by client.' },
      { question: 'How many treatments are usually discussed?', answer: 'A course may be advised and depends on the area treated and skin goals.' }
    ],
    relatedTreatmentIds: ['microneedling', 'skin-resurfacing'],
    provider: 'Clinical specialist',
    reviewText: 'Comfortable experience and a subtle lift in tone.'
  },
  {
    id: 'led-light-therapy',
    slug: 'led-light-therapy',
    name: 'LED Light Therapy',
    category: 'Skin Rejuvenation',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A gentle, low-downtime light treatment for energized, calm skin.',
    fullDescription: 'LED therapy uses different wavelengths to support the skin’s natural repair and calming processes. It is often used as an adjunctive treatment during a skin maintenance plan or as part of a brighter, more balanced skin routine. It is not a replacement for a full medical assessment and suitability should be discussed with a qualified practitioner.',
    skinConcerns: ['General skin maintenance', 'Dehydration'],
    treatmentDuration: '20-30 minutes',
    durationMinutes: 30,
    startingPrice: 95,
    priceBand: 'Under $100',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Clients wanting a gentle, low-downtime boost',
    providerType: 'Aesthetician',
    consultationRequired: false,
    availability: 'Appointment request available',
    featured: false,
    rating: 4.8,
    reviewCount: 56,
    benefits: ['Convenient calming treatment', 'Supports a rested appearance', 'Can pair well with facials or maintenance plans'],
    process: ['Skin prep and treatment setup', 'LED light session', 'Post-treatment hydration and guidance'],
    aftercare: ['Skip harsh skincare for a short time', 'Continue with gentle products', 'Use SPF as usual'],
    faqs: [
      { question: 'Is it suitable for sensitive skin?', answer: 'Often yes, but sensitivity and the treatment protocol should be reviewed by your therapist.' },
      { question: 'How frequent is it?', answer: 'A series may be recommended depending on treatment goals and skin condition.' }
    ],
    relatedTreatmentIds: ['hydrating-facial', 'skin-consultation'],
    provider: 'Skin therapist',
    reviewText: 'A lovely reset for tired skin.'
  },
  {
    id: 'skin-resurfacing',
    slug: 'skin-resurfacing',
    name: 'Skin Resurfacing',
    category: 'Skin Rejuvenation',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Refining treatment designed to smooth texture and improve skin clarity.',
    fullDescription: 'Skin resurfacing treatments can be used to help improve the appearance of uneven texture, roughness and dullness. They are chosen following a professional assessment, with treatment strength adjusted according to skin tolerance, concerns and recent skin history. Results depend on the individual and should be approached with realistic expectations.',
    skinConcerns: ['Texture', 'Uneven tone', 'Congestion'],
    treatmentDuration: '45-60 minutes',
    durationMinutes: 60,
    startingPrice: 310,
    priceBand: '$250–$500',
    downtime: 'Short recovery',
    suitableFor: 'Clients seeking texture refinement and renewal',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: false,
    rating: 4.7,
    reviewCount: 40,
    benefits: ['Supports smoother texture', 'Improves fatigued or rough-looking skin', 'Can be integrated into a roadmap plan'],
    process: ['Skin history and suitability assessment', 'Resurfacing treatment application', 'Post-treatment review and ongoing care'],
    aftercare: ['Avoid direct sun, active exfoliants and heat', 'Use soothing products and SPF', 'Allow recovery time before new actives'],
    faqs: [
      { question: 'How long is the recovery?', answer: 'This varies by treatment type and individual skin, with some temporary redness or peeling common.' },
      { question: 'Can it be combined with other procedures?', answer: 'A clinician may recommend combining it with other treatments based on your skin plan and recovery windows.' }
    ],
    relatedTreatmentIds: ['microneedling', 'chemical-peels'],
    provider: 'Clinical expert',
    reviewText: 'It was a very considered treatment plan.'
  },
  {
    id: 'body-contouring',
    slug: 'body-contouring',
    name: 'Body Contouring Consultation',
    category: 'Body Treatments',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Consultation to assess sculpting goals and non-surgical treatment options.',
    fullDescription: 'Body contouring consultations are designed to understand treatment goals around body shape, definition and overall confidence. They are not a medical diagnosis and should be approached as part of a broader assessment of the relevant treatment options. Suitability depends on lifestyle, skin condition and an appropriately qualified practitioner’s assessment.',
    skinConcerns: ['General skin maintenance'],
    treatmentDuration: '30-45 minutes',
    durationMinutes: 45,
    startingPrice: 180,
    priceBand: '$100–$250',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Clients considering non-surgical contouring support',
    providerType: 'Medical practitioner',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: false,
    rating: 4.7,
    reviewCount: 36,
    benefits: ['Tailored body-shape assessment', 'Transparent treatment planning', 'Clear expectations and cost guidance'],
    process: ['Goals discussion and anatomical assessment', 'Review of suitable treatment approach', 'Aftercare and ongoing planning'],
    aftercare: ['Follow the clinician’s recommendations', 'Hydrate and avoid excess heat when directed', 'Keep realistic expectations for gradual change'],
    faqs: [
      { question: 'Is it a substitute for exercise or medical treatment?', answer: 'No. It should be viewed as a supportive treatment consideration, not a medical substitute.' },
      { question: 'How is treatment chosen?', answer: 'The practitioner selects an approach based on the area, skin condition and your goals.' }
    ],
    relatedTreatmentIds: ['laser-hair-reduction', 'skin-consultation'],
    provider: 'Body aesthetics clinician',
    reviewText: 'Clear, calm and reassuring from the start.'
  },
  {
    id: 'skin-consultation',
    slug: 'skin-consultation',
    name: 'Personalized Skin Consultation',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'A comprehensive skin assessment to build a realistic care plan for your goals.',
    fullDescription: 'A personalized skin consultation provides the opportunity to review skin concerns, daily habits and treatment goals in a considered, non-judgmental environment. It helps map a plan for home care, maintenance treatments and long-term skin support, always with realistic expectations and a focus on safety. This is not a medical diagnosis and may be used to inform a future treatment pathway.',
    skinConcerns: ['General skin maintenance', 'Dehydration', 'Fine lines'],
    treatmentDuration: '30 minutes',
    durationMinutes: 30,
    startingPrice: 80,
    priceBand: 'Under $100',
    downtime: 'No or minimal expected downtime',
    suitableFor: 'Anyone starting or refining a skincare plan',
    providerType: 'Aesthetician',
    consultationRequired: true,
    availability: 'Consultation required',
    featured: true,
    rating: 4.9,
    reviewCount: 110,
    benefits: ['Clear skin roadmap', 'Tailored recommendations', 'Supportive ongoing guidance'],
    process: ['Skin analysis and discussion', 'Personalized routine and treatment suggestions', 'Follow-up planning'],
    aftercare: ['Commit to a gentle, consistent routine', 'Use SPF daily', 'Review progress and adjust as needed'],
    faqs: [
      { question: 'Is it only for new clients?', answer: 'No. Existing clients often book reviews to refine routines or maintain results.' },
      { question: 'Can it include treatment planning?', answer: 'Yes, it can form the basis of a broader treatment plan based on your skin priorities and consultation findings.' }
    ],
    relatedTreatmentIds: ['hydrating-facial', 'microneedling'],
    provider: 'Skin therapist',
    reviewText: 'A thoughtful and tailored skincare review.'
  }
];

const RESULTS = [
  {
    id: 'result-1',
    category: 'Skin Rejuvenation',
    treatment: 'Microneedling',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    caption: 'Illustrative treatment result for refreshed skin texture and luminosity.'
  },
  {
    id: 'result-2',
    category: 'Facials',
    treatment: 'Hydrating Facial',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    caption: 'Hydration-focused facial treatment for a plumper, calmer finish.'
  },
  {
    id: 'result-3',
    category: 'Injectables',
    treatment: 'Wrinkle Relaxing Consultation',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    caption: 'Consultation-led aesthetic planning for soft, balanced expression work.'
  },
  {
    id: 'result-4',
    category: 'Laser Treatments',
    treatment: 'IPL Skin Treatments',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
    caption: 'Illustrative tone-refining result using light therapy in a guided treatment plan.'
  },
  {
    id: 'result-5',
    category: 'Body Treatments',
    treatment: 'Body Contouring Consultation',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    caption: 'Consultation-led contouring discussion for sculpting-focused goals.'
  },
  {
    id: 'result-6',
    category: 'Wellness',
    treatment: 'Personalized Skin Consultation',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80',
    caption: 'Skin consultation planning for a tailored routine and support strategy.'
  }
];

const REVIEWS = [
  {
    id: 'review-1',
    name: 'A. L.',
    rating: 5,
    category: 'Skin Rejuvenation',
    treatment: 'Microneedling',
    date: '2026-09-17',
    text: 'The whole experience felt calm and highly considered. I left with a clear plan and my skin looked noticeably fresher within days.'
  },
  {
    id: 'review-2',
    name: 'M. S.',
    rating: 5,
    category: 'Facials',
    treatment: 'Hydrating Facial',
    date: '2026-08-05',
    text: 'Lovely treatment, genuinely relaxing and very informative. The hydration boost was exactly what my skin needed.'
  },
  {
    id: 'review-3',
    name: 'R. T.',
    rating: 4,
    category: 'Injectables',
    treatment: 'Wrinkle Relaxing Consultation',
    date: '2026-07-14',
    text: 'The consultation was very thorough. I appreciated the focus on natural-looking outcomes and a gradual approach.'
  },
  {
    id: 'review-4',
    name: 'K. D.',
    rating: 5,
    category: 'Laser Treatments',
    treatment: 'IPL Skin Treatments',
    date: '2026-06-10',
    text: 'The treatment planning was straightforward and professional. The clinic made it easy to understand the process and aftercare.'
  },
  {
    id: 'review-5',
    name: 'E. B.',
    rating: 4,
    category: 'Wellness',
    treatment: 'Personalized Skin Consultation',
    date: '2026-05-29',
    text: 'Helpful and supportive from the first consultation. I left with a tailored skin routine and a realistic sense of next steps.'
  },
  {
    id: 'review-6',
    name: 'L. P.',
    rating: 5,
    category: 'Facials',
    treatment: 'Deep Cleansing Facial',
    date: '2026-04-18',
    text: 'Very polished and calming experience. The team explained everything clearly and the results felt gentle but effective.'
  }
];

const ARTICLES = [
  {
    id: 'understanding-aesthetic-consultations',
    title: 'Understanding aesthetic consultations',
    category: 'Skin education',
    date: '2026-09-11',
    author: 'Lumière Editorial Team',
    readingTime: '5 min read',
    cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'A clear consultation helps you understand how treatment goals, skin history and realistic expectations come together.',
    content: [
      'An aesthetic consultation is often the first step in understanding what a treatment might involve, what to expect and how a plan can support your goals. It is not a medical diagnosis, but it is a key time to ask questions, learn about the treatment approach and discuss realistic outcomes.',
      'A good consultation should cover more than the treatment itself. It is an opportunity to understand your skin history, daily routine, any sensitivities and your overall goals. This helps a practitioner recommend the most appropriate next step without rushing into treatment.',
      'The goal is to create a thoughtful plan based on your priorities, the limitations of the treatment and your readiness for a course of care. Clarity, transparency and informed consent remain essential parts of this process.'
    ],
    relatedArticleIds: ['guide-to-skincare-routines', 'preparing-for-a-treatment-consultation']
  },
  {
    id: 'guide-to-skincare-routines',
    title: 'A guide to skincare routines',
    category: 'Skincare',
    date: '2026-08-21',
    author: 'Lumière Editorial Team',
    readingTime: '6 min read',
    cover: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'A considered skincare routine balances cleansing, hydration, protection and gentle support for long-term skin comfort.',
    content: [
      'A healthy skincare routine does not need to be overly complicated. A strong baseline typically includes cleansing, hydration and daily sun protection, with the addition of targeted products as needed for concerns such as dryness, texture or sensitivity.',
      'The best routines are the ones you can maintain consistently. In many cases, a simple approach is easier to maintain and more effective in the long term than a heavily layered routine with multiple active ingredients.',
      'Your practitioner can help you choose products that support your skin goals while avoiding over-exfoliation or layering too many actives at once.'
    ],
    relatedArticleIds: ['understanding-aesthetic-consultations', 'questions-to-ask-an-aesthetics-practitioner']
  },
  {
    id: 'what-to-expect-during-a-facial',
    title: 'What to expect during a facial',
    category: 'Facials',
    date: '2026-08-07',
    author: 'Lumière Editorial Team',
    readingTime: '4 min read',
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Facials are often a supportive, relaxing treatment that can help with hydration, comfort and skin maintenance.',
    content: [
      'Facials generally begin with a consultation and skin assessment so the treatment can be adapted to your skin condition. This may include discussion of any sensitivity, recent products or goals such as hydration, radiance or a calmer complexion.',
      'During the treatment, you may experience cleansing, exfoliation, massage and hydration steps depending on the chosen facial. The pace is typically tailored to your comfort and skin tolerance.',
      'After a facial, the skin may feel refreshed and more comfortable. It is common to follow any aftercare instructions and maintain a gentle skincare routine to keep the skin balanced.'
    ],
    relatedArticleIds: ['guide-to-skincare-routines', 'understanding-recovery-and-aftercare']
  },
  {
    id: 'preparing-for-a-treatment-consultation',
    title: 'Preparing for a treatment consultation',
    category: 'Consultation guidance',
    date: '2026-07-15',
    author: 'Lumière Editorial Team',
    readingTime: '5 min read',
    cover: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'A thoughtful consultation is easier when you arrive with clear goals, questions and the right information for your skin.',
    content: [
      'Preparing for a treatment consultation can help you feel more confident and make the most of the time. It helps to think about the areas or concerns you want to discuss, any routines you already follow and the type of outcome you hope to achieve.',
      'It is also helpful to note any skin sensitivities, recent treatments or products that have affected your skin. This information can support a more accurate recommendation and help you avoid unsuitable treatment choices.',
      'The consultation should be a two-way conversation, so bring any questions you have about process, downtime, aftercare and the recommended treatment plan.'
    ],
    relatedArticleIds: ['what-to-expect-during-a-facial', 'questions-to-ask-an-aesthetics-practitioner']
  },
  {
    id: 'understanding-recovery-and-aftercare',
    title: 'Understanding recovery and aftercare',
    category: 'Aftercare',
    date: '2026-06-28',
    author: 'Lumière Editorial Team',
    readingTime: '6 min read',
    cover: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Aftercare is just as important as the treatment itself, helping the skin settle and maintain long-term comfort.',
    content: [
      'Recovery and aftercare vary depending on the treatment, but the principle remains the same: support the skin as it settles and protect it from irritation or excess stress.',
      'Most treatment plans include simple recommendations such as gentle cleansing, hydration, sun protection and avoiding harsh actives or heat exposure for a short period. These steps can help reduce irritation and support the treatment plan.',
      'Following a treatment, any advice from your practitioner should be treated as the best guide for your own skin. If you experience unexpected discomfort, it is important to contact the clinic for guidance.'
    ],
    relatedArticleIds: ['understanding-aesthetic-consultations', 'what-to-expect-during-a-facial']
  },
  {
    id: 'questions-to-ask-an-aesthetics-practitioner',
    title: 'Questions to ask an aesthetics practitioner',
    category: 'Consultation guidance',
    date: '2026-06-02',
    author: 'Lumière Editorial Team',
    readingTime: '5 min read',
    cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'The right questions can help you feel informed, comfortable and prepared before a treatment decision.',
    content: [
      'A good consultation should leave you feeling informed rather than rushed. It is helpful to ask about the treatment process, the likely experience, aftercare and whether the practitioner feels the plan is suitable for your goals.',
      'Asking about realistic outcomes, downtime and how treatment may fit into your broader skin plan can help set healthy expectations. You may also wish to ask whether there are alternatives, how long a plan might take and what ongoing support is available.',
      'The most important thing is that the conversation feels open, transparent and respectful of your questions, needs and comfort levels.'
    ],
    relatedArticleIds: ['guide-to-skincare-routines', 'preparing-for-a-treatment-consultation']
  }
];

function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navPanel = document.querySelector('.nav-panel');

  if (header && !header.classList.contains('home-header')) {
    const onScroll = () => {
      if (window.scrollY > 16) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (header && header.classList.contains('home-header')) {
    const onScroll = () => {
      if (window.scrollY > 16) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (!navToggle || !navPanel) return;

  const toggleMenu = () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navPanel.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  };

  navToggle.addEventListener('click', toggleMenu);

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navPanel.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navToggle.setAttribute('aria-expanded', 'false');
      navPanel.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      navToggle.setAttribute('aria-expanded', 'false');
      navPanel.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

function initRevealObserver() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => observer.observe(el));
}

function initAgencyToast() {
  const toast = document.querySelector('.toast');
  if (!toast) return;

  try {
    const key = 'lumiere-toast-dismissed';
    const hasSeen = window.sessionStorage && window.sessionStorage.getItem(key) === 'true';
    if (hasSeen) return;
  } catch (error) {
    // Graceful fallback when storage is unavailable
  }

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  const close = toast.querySelector('.toast-close');
  if (close) {
    close.addEventListener('click', () => {
      toast.classList.remove('is-visible');
      try {
        if (window.sessionStorage) {
          window.sessionStorage.setItem('lumiere-toast-dismissed', 'true');
        }
      } catch (error) {
        // Ignore storage exceptions
      }
    });
  }
}

function renderHomeCollections() {
  const signatureGrid = document.getElementById('signatureTreatmentsGrid');
  const journalGrid = document.getElementById('homeJournalGrid');
  const reviewGrid = document.getElementById('homeReviewGrid');

  if (signatureGrid) {
    const featured = TREATMENTS.filter((treatment) => treatment.featured).slice(0, 3);
    signatureGrid.innerHTML = featured.map((treatment) => `
      <article class="treatment-card" data-reveal>
        <img class="card-image" src="${treatment.image}" alt="${treatment.name}" loading="lazy" width="800" height="600">
        <div class="card-body">
          <div class="card-meta">
            <span>${treatment.category}</span>
            <span>${treatment.treatmentDuration}</span>
          </div>
          <h3>${treatment.name}</h3>
          <p>${treatment.shortDescription}</p>
          <div class="card-footer">
            <div>
              <div class="price">${formatPrice(treatment.startingPrice)} <small>Illustrative</small></div>
            </div>
            <div class="rating"><span class="star">★</span> ${treatment.rating} <span class="muted-copy">(${treatment.reviewCount})</span></div>
          </div>
          <div class="treatment-actions">
            <a class="btn btn-soft" href="treatment.html?id=${treatment.id}">View treatment</a>
            <a class="btn btn-dark" href="contact.html">Book consultation</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  if (journalGrid) {
    journalGrid.innerHTML = ARTICLES.slice(0, 3).map((article) => `
      <article class="article-card" data-reveal>
        <img src="${article.cover}" alt="${article.title}" loading="lazy" width="800" height="600">
        <div class="article-body">
          <div class="article-meta">
            <span>${article.category}</span>
            <span>${article.date}</span>
            <span>${article.readingTime}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <div class="inline-actions" style="margin-top: 16px;">
            <a class="link-inline" href="article.html?id=${article.id}">Read article</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  if (reviewGrid) {
    reviewGrid.innerHTML = REVIEWS.slice(0, 3).map((review) => `
      <article class="review-card" data-reveal>
        <div class="review-header">
          <strong>${review.name}</strong>
          <div class="review-meta">${review.category}</div>
        </div>
        <div class="star-row" aria-label="${review.rating} out of 5 stars">${renderStars(review.rating)}</div>
        <p style="margin-top: 12px;">${review.text}</p>
      </article>
    `).join('');
  }
}

function renderTreatments() {
  const treatmentGrid = document.getElementById('treatmentGrid');
  const resultsCount = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const resetButton = document.getElementById('resetFilters');
  const searchField = document.getElementById('treatmentSearch');
  const allCategorySelect = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const durationFilter = document.getElementById('durationFilter');
  const downtimeFilter = document.getElementById('downtimeFilter');
  const providerFilter = document.getElementById('providerFilter');
  const consultationFilter = document.getElementById('consultationFilter');
  const availabilityFilter = document.getElementById('availabilityFilter');
  const ratingFilter = document.getElementById('ratingFilter');
  const skinConcerns = Array.from(document.querySelectorAll('input[name="skinConcern"]'));

  if (!treatmentGrid || !resultsCount) return;

  function updateCount(value) {
    resultsCount.textContent = `${value} result${value === 1 ? '' : 's'}`;
  }

  function renderTreatmentCards(list) {
    if (!list.length) {
      treatmentGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>No treatments match</h3>
          <p>Try widening your search or reset the filters to explore the full catalogue.</p>
          <div class="inline-actions" style="justify-content: center; margin-top: 18px;">
            <button type="button" class="btn btn-dark" id="clearFiltersEmpty">Clear filters</button>
          </div>
        </div>
      `;
      const button = document.getElementById('clearFiltersEmpty');
      if (button) {
        button.addEventListener('click', resetFilters);
      }
      updateCount(0);
      return;
    }

    treatmentGrid.innerHTML = list.map((treatment) => `
      <article class="treatment-card">
        <img class="card-image" src="${treatment.image}" alt="${treatment.name}" loading="lazy" width="800" height="600">
        <div class="card-body">
          <div class="card-meta">
            <span>${treatment.category}</span>
            <span>${treatment.treatmentDuration}</span>
          </div>
          <h3>${treatment.name}</h3>
          <p>${treatment.shortDescription}</p>
          <div class="card-footer">
            <div class="price">${formatPrice(treatment.startingPrice)} <small>Illustrative</small></div>
            <div class="rating"><span class="star">★</span> ${treatment.rating} <span class="muted-copy">(${treatment.reviewCount})</span></div>
          </div>
          <div class="treatment-actions">
            <a class="btn btn-soft" href="treatment.html?id=${treatment.id}">View treatment</a>
            <a class="btn btn-dark" href="contact.html">Book consultation</a>
          </div>
        </div>
      </article>
    `).join('');

    updateCount(list.length);
  }

  function resetFilters() {
    if (searchField) searchField.value = '';
    if (allCategorySelect) allCategorySelect.value = 'all';
    if (priceFilter) priceFilter.value = 'all';
    if (durationFilter) durationFilter.value = 'all';
    if (downtimeFilter) downtimeFilter.value = 'all';
    if (providerFilter) providerFilter.value = 'all';
    if (consultationFilter) consultationFilter.value = 'all';
    if (availabilityFilter) availabilityFilter.value = 'all';
    if (ratingFilter) ratingFilter.value = 'all';
    if (sortSelect) sortSelect.value = 'recommended';
    skinConcerns.forEach((checkbox) => { checkbox.checked = false; });
    applyFilters();
  }

  function getSelectedConcerns() {
    return skinConcerns.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  }

  function getPriceValue(value) {
    if (value === 'all') return null;
    const options = {
      under100: { max: 99 },
      '100-250': { min: 100, max: 250 },
      '250-500': { min: 250, max: 500 },
      over500: { min: 500 }
    };
    return options[value] || null;
  }

  function getDurationValue(value) {
    if (value === 'all') return null;
    const options = {
      under30: { max: 29 },
      '30-60': { min: 30, max: 60 },
      over60: { min: 61 }
    };
    return options[value] || null;
  }

  function getRatingValue(value) {
    if (value === 'all') return null;
    const options = { '4.0': 4, '4.5': 4.5, '4.8': 4.8 };
    return options[value] || null;
  }

  function sortTreatments(list, type) {
    const sorted = [...list];

    switch (type) {
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
        sorted.sort((a, b) => (b.featured === true) - (a.featured === true) || b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
    }

    return sorted;
  }

  function applyFilters() {
    const searchQuery = (searchField ? searchField.value : '').trim().toLowerCase();
    const categoryValue = allCategorySelect ? allCategorySelect.value : 'all';
    const priceRule = priceFilter ? getPriceValue(priceFilter.value) : null;
    const durationRule = durationFilter ? getDurationValue(durationFilter.value) : null;
    const selectedConcerns = getSelectedConcerns();
    const ratingRule = ratingFilter ? getRatingValue(ratingFilter.value) : null;
    const providerValue = providerFilter ? providerFilter.value : 'all';
    const consultationValue = consultationFilter ? consultationFilter.value : 'all';
    const availabilityValue = availabilityFilter ? availabilityFilter.value : 'all';
    const downtimeValue = downtimeFilter ? downtimeFilter.value : 'all';
    const sortValue = sortSelect ? sortSelect.value : 'recommended';

    let filtered = TREATMENTS.filter((treatment) => {
      const matchesSearch = !searchQuery || [
        treatment.name,
        treatment.category,
        treatment.shortDescription,
        treatment.fullDescription,
        ...(treatment.skinConcerns || [])
      ].some((field) => String(field || '').toLowerCase().includes(searchQuery));

      const matchesCategory = categoryValue === 'all' || treatment.category === categoryValue;
      const matchesConcerns = !selectedConcerns.length || (treatment.skinConcerns || []).some((concern) => selectedConcerns.includes(concern));
      const matchesPrice = !priceRule || (
        (priceRule.min === undefined || treatment.startingPrice >= priceRule.min) &&
        (priceRule.max === undefined || treatment.startingPrice <= priceRule.max)
      );
      const matchesDuration = !durationRule || (
        (durationRule.min === undefined || treatment.durationMinutes >= durationRule.min) &&
        (durationRule.max === undefined || treatment.durationMinutes <= durationRule.max)
      );
      const matchesDowntime = downtimeValue === 'all' || treatment.downtime === downtimeValue;
      const matchesProvider = providerValue === 'all' || treatment.providerType === providerValue;
      const matchesConsultation = consultationValue === 'all' || String(treatment.consultationRequired) === consultationValue;
      const matchesAvailability = availabilityValue === 'all' || treatment.availability === availabilityValue;
      const matchesRating = !ratingRule || treatment.rating >= ratingRule;

      return matchesSearch && matchesCategory && matchesConcerns && matchesPrice && matchesDuration && matchesDowntime && matchesProvider && matchesConsultation && matchesAvailability && matchesRating;
    });

    filtered = sortTreatments(filtered, sortValue);
    renderTreatmentCards(filtered);
  }

  const filterControls = [
    searchField,
    allCategorySelect,
    priceFilter,
    durationFilter,
    downtimeFilter,
    providerFilter,
    consultationFilter,
    availabilityFilter,
    ratingFilter,
    sortSelect
  ].filter(Boolean);

  filterControls.forEach((element) => {
    element.addEventListener('input', applyFilters);
    element.addEventListener('change', applyFilters);
  });

  skinConcerns.forEach((checkbox) => checkbox.addEventListener('change', applyFilters));
  if (resetButton) {
    resetButton.addEventListener('click', resetFilters);
  }

  renderTreatmentCards(sortTreatments([...TREATMENTS], 'recommended'));
  applyFilters();
}

function renderTreatmentDetail() {
  const container = document.getElementById('treatmentDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get('id');
  const treatment = TREATMENTS.find((item) => item.id === selectedId || item.slug === selectedId);

  if (!treatment) {
    container.innerHTML = `
      <div class="empty-state" style="margin-top: 36px;">
        <h3>Treatment not found</h3>
        <p>The treatment you selected is not available in our current catalogue.</p>
        <div class="inline-actions" style="justify-content: center; margin-top: 18px;">
          <a class="btn btn-dark" href="treatments.html">Back to treatments</a>
        </div>
      </div>
    `;
    return;
  }

  const related = TREATMENTS.filter((item) => treatment.relatedTreatmentIds.includes(item.id));

  container.innerHTML = `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span>/</span>
      <a href="treatments.html">Treatments</a>
      <span>/</span>
      <span>${treatment.name}</span>
    </nav>

    <div class="detail-layout" style="margin-top: 24px;">
      <div>
        <div class="detail-hero">
          <img src="${treatment.image}" alt="${treatment.name}" loading="lazy" width="1200" height="900">
        </div>
      </div>
      <aside class="detail-panel">
        <div class="kicker">${treatment.category}</div>
        <h1 style="margin: 0 0 14px; font-size: clamp(2.5rem, 4vw, 4.1rem); font-family: Georgia, 'Times New Roman', serif; color: var(--plum); line-height: 1;">${treatment.name}</h1>
        <p class="muted-copy" style="font-size: 1.04rem;">${treatment.shortDescription}</p>
        <div class="fact-list">
          <div class="fact-item">
            <strong>Duration</strong>
            <span>${treatment.treatmentDuration}</span>
          </div>
          <div class="fact-item">
            <strong>Starting from</strong>
            <span>${formatPrice(treatment.startingPrice)} • illustrative</span>
          </div>
          <div class="fact-item">
            <strong>Downtime</strong>
            <span>${treatment.downtime}</span>
          </div>
          <div class="fact-item">
            <strong>Consultation</strong>
            <span>${treatment.consultationRequired ? 'Required' : 'Not required'}</span>
          </div>
        </div>
        <div class="inline-actions" style="margin-top: 24px;">
          <a class="btn btn-dark" href="contact.html">Book consultation</a>
          <a class="btn btn-soft" href="treatments.html">Explore all</a>
        </div>
      </aside>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Overview</h2>
        <p>${treatment.fullDescription}</p>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Intended purpose</h2>
        <p>${treatment.suitableFor}</p>
        <ul>
          ${treatment.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Treatment process</h2>
        <ul>
          ${treatment.process.map((step) => `<li>${step}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Aftercare overview</h2>
        <ul>
          ${treatment.aftercare.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Frequently asked questions</h2>
        <div class="faq-list">
          ${treatment.faqs.map((faq) => `
            <div class="faq-item" style="margin-top: 18px; border-top: 1px solid var(--line); padding-top: 16px;">
              <strong style="display: block; margin-bottom: 6px; color: var(--plum);">${faq.question}</strong>
              <p style="margin: 0; color: var(--muted);">${faq.answer}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Related treatments</h2>
        <div class="grid-3" style="margin-top: 20px;">
          ${related.length ? related.map((item) => `
            <article class="treatment-card">
              <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy" width="800" height="600">
              <div class="card-body">
                <div class="card-meta">
                  <span>${item.category}</span>
                  <span>${item.treatmentDuration}</span>
                </div>
                <h3>${item.name}</h3>
                <p>${item.shortDescription}</p>
                <div class="treatment-actions">
                  <a class="btn btn-soft" href="treatment.html?id=${item.id}">View treatment</a>
                </div>
              </div>
            </article>
          `).join('') : '<p>No related treatments available.</p>'}
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-panel">
        <h2>Reviews</h2>
        <div class="review-grid" style="margin-top: 18px; grid-template-columns: repeat(2, minmax(0, 1fr));">
          ${REVIEWS.filter((review) => review.category === treatment.category || review.treatment === treatment.name).slice(0, 2).map((review) => `
            <article class="review-card">
              <div class="review-header">
                <strong>${review.name}</strong>
                <div class="review-meta">${review.date}</div>
              </div>
              <div class="star-row" aria-label="${review.rating} out of 5 stars">${renderStars(review.rating)}</div>
              <p style="margin-top: 12px;">${review.text}</p>
            </article>
          `).join('') || '<p style="margin:0; color: var(--muted);">No demo reviews are available for this treatment yet.</p>'}
        </div>
      </div>
    </div>
  `;
}

function renderResultsGallery() {
  const gallery = document.getElementById('resultsGallery');
  const filterButtons = document.querySelectorAll('[data-result-filter]');
  if (!gallery) return;

  let selectedCategory = 'all';
  const render = () => {
    const items = selectedCategory === 'all' ? RESULTS : RESULTS.filter((item) => item.category === selectedCategory);
    gallery.innerHTML = items.map((item) => `
      <article class="result-item">
        <button class="result-trigger" data-lightbox-index="${RESULTS.indexOf(item)}" style="background:none;border:none;padding:0;display:block;width:100%;text-align:left;cursor:pointer;">
          <img src="${item.image}" alt="${item.caption}" loading="lazy" width="1000" height="720">
          <div class="result-card" style="padding: 18px 18px 20px;">
            <div class="card-meta">
              <span>${item.category}</span>
              <span>${item.treatment}</span>
            </div>
            <p>${item.caption}</p>
          </div>
        </button>
      </article>
    `).join('');

    gallery.querySelectorAll('.result-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        openLightbox(Number(button.dataset.lightboxIndex));
      });
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      selectedCategory = button.dataset.resultFilter;
      render();
    });
  });

  render();

  const lightbox = document.getElementById('lightbox');
  const caption = document.getElementById('lightboxCaption');
  const image = document.getElementById('lightboxImage');
  const closeButton = document.getElementById('lightboxClose');
  const prevButton = document.getElementById('lightboxPrev');
  const nextButton = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = RESULTS[currentIndex];
    if (!item || !lightbox || !image || !caption) return;
    image.src = item.image;
    image.alt = item.caption;
    caption.textContent = `${item.treatment} • ${item.category} — ${item.caption}`;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    image.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const nextIndex = (currentIndex - 1 + RESULTS.length) % RESULTS.length;
      openLightbox(nextIndex);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % RESULTS.length;
      openLightbox(nextIndex);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % RESULTS.length;
      openLightbox(nextIndex);
    }
    if (event.key === 'ArrowLeft') {
      const nextIndex = (currentIndex - 1 + RESULTS.length) % RESULTS.length;
      openLightbox(nextIndex);
    }
  });
}

function renderReviewsPage() {
  const container = document.getElementById('reviewsList');
  if (!container) return;

  const ratingFilter = document.getElementById('reviewRatingFilter');
  const sortFilter = document.getElementById('reviewSort');
  const emptyState = document.getElementById('reviewEmpty');

  function buildSummary(reviews) {
    const total = reviews.length;
    const average = total ? (reviews.reduce((sum, review) => sum + review.rating, 0) / total).toFixed(1) : '0.0';
    const counts = [5, 4, 3, 2, 1].map((value) => ({ value, count: reviews.filter((review) => review.rating === value).length }));
    const ratingBars = counts.map((item) => ({ ...item, percent: total ? (item.count / total) * 100 : 0 }));
    return { total, average, ratingBars };
  }

  function render() {
    const ratingValue = ratingFilter ? Number(ratingFilter.value) : 0;
    const sortValue = sortFilter ? sortFilter.value : 'newest';
    let list = ratingValue ? REVIEWS.filter((review) => review.rating >= ratingValue) : [...REVIEWS];

    if (sortValue === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const summary = buildSummary(list);
    const summaryText = document.getElementById('reviewSummary');
    const scoreNode = document.getElementById('reviewAverage');
    const summaryBars = document.getElementById('summaryBars');

    if (summaryText) {
      summaryText.textContent = `${summary.total} demo testimonials`;
    }

    if (scoreNode) {
      scoreNode.textContent = summary.average;
    }

    if (summaryBars) {
      summaryBars.innerHTML = summary.ratingBars.map((bar) => `
        <div class="rating-row">
          <span>${bar.value}</span>
          <div class="bar"><span style="width: ${bar.percent}%"></span></div>
          <span>${bar.count}</span>
        </div>
      `).join('');
    }

    if (!list.length) {
      container.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = list.map((review) => `
      <article class="review-card">
        <div class="review-header">
          <strong>${review.name}</strong>
          <div class="review-meta">${review.category} • ${formatDate(review.date)}</div>
        </div>
        <div class="star-row" aria-label="${review.rating} out of 5 stars">${renderStars(review.rating)}</div>
        <p style="margin-top: 12px;">${review.text}</p>
      </article>
    `).join('');
  }

  if (ratingFilter) ratingFilter.addEventListener('change', render);
  if (sortFilter) sortFilter.addEventListener('change', render);
  render();
}

function renderJournalPage() {
  const container = document.getElementById('journalList');
  if (!container) return;

  container.innerHTML = ARTICLES.map((article) => `
    <article class="article-card">
      <img src="${article.cover}" alt="${article.title}" loading="lazy" width="1000" height="700">
      <div class="article-body">
        <div class="article-meta">
          <span>${article.category}</span>
          <span>${article.date}</span>
          <span>${article.readingTime}</span>
        </div>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <div class="inline-actions" style="margin-top: 16px;">
          <a class="link-inline" href="article.html?id=${article.id}">Read article</a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderArticlePage() {
  const container = document.getElementById('articleDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = ARTICLES.find((item) => item.id === id);

  if (!article) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Article not found</h3>
        <p>The article you selected is not available in the current journal.</p>
        <div class="inline-actions" style="justify-content: center; margin-top: 18px;">
          <a class="btn btn-dark" href="journal.html">Back to journal</a>
        </div>
      </div>
    `;
    return;
  }

  const related = ARTICLES.filter((item) => article.relatedArticleIds.includes(item.id));

  container.innerHTML = `
    <div class="article-layout">
      <article class="article-body-wrap">
        <div class="article-hero">
          <img src="${article.cover}" alt="${article.title}" loading="lazy" width="1200" height="840">
        </div>
        <div class="detail-section">
          <div class="article-meta" style="margin-bottom: 12px;">
            <span>${article.category}</span>
            <span>${formatDate(article.date)}</span>
            <span>${article.readingTime}</span>
          </div>
          <h1 style="margin: 0 0 12px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(2.5rem, 4vw, 4rem); color: var(--plum); line-height: 1.05; letter-spacing: -0.04em;">${article.title}</h1>
          <p class="muted-copy">By ${article.author}</p>
        </div>
        <div class="article-body" style="margin-top: 22px;">
          ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </div>
      </article>
      <aside>
        <div class="sidebar-box">
          <h3 style="margin-top:0; font-size: 1.2rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted);">Related reading</h3>
          <div class="feature-list" style="margin-top: 14px;">
            ${related.length ? related.map((item) => `
              <div class="feature-card" style="padding: 18px 16px;">
                <h3 style="font-size: 1.2rem; margin-bottom: 10px;">${item.title}</h3>
                <p>${item.excerpt}</p>
                <div style="margin-top: 14px;">
                  <a class="link-inline" href="article.html?id=${item.id}">Read more</a>
                </div>
              </div>
            `).join('') : '<p class="muted-copy">No related articles available.</p>'}
          </div>
        </div>
      </aside>
    </div>
  `;
}

function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll('.form-step'));
  const nextButton = document.getElementById('nextStep');
  const backButton = document.getElementById('prevStep');
  const submitButton = document.getElementById('submitEnquiry');
  const statusBox = document.getElementById('submitStatus');
  const consentCheckbox = document.getElementById('consentCheck');
  let currentStepIndex = 0;

  function getFieldValue(name) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return '';
    if (field.type === 'checkbox') return field.checked;
    return field.value.trim();
  }

  function updateSummaryReview() {
    const summaryReview = document.getElementById('summaryReview');
    if (!summaryReview) return;

    const category = getFieldValue('treatmentCategory') || 'Not selected';
    const treatmentId = getFieldValue('preferredTreatment');
    const treatmentName = TREATMENTS.find((item) => item.id === treatmentId || item.name === treatmentId)?.name || treatmentId || 'Not selected';
    const clientType = getFieldValue('visitType') || 'Not selected';
    const dateValue = getFieldValue('preferredDate');
    const preferredContact = getFieldValue('contactMethod') || 'Not selected';

    summaryReview.innerHTML = `
      <div class="summary-item"><span>Interest</span><strong>${treatmentName}</strong></div>
      <div class="summary-item"><span>Category</span><strong>${category}</strong></div>
      <div class="summary-item"><span>Client type</span><strong>${clientType}</strong></div>
      <div class="summary-item"><span>Preferred date</span><strong>${dateValue ? formatDate(dateValue) : 'Not selected'}</strong></div>
      <div class="summary-item"><span>Preferred contact</span><strong>${preferredContact}</strong></div>
    `;
  }

  function updateStepUI() {
    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index === currentStepIndex);
    });

    const total = steps.length;
    const stepIndicators = document.querySelectorAll('.stepper span');
    stepIndicators.forEach((indicator, index) => {
      indicator.classList.toggle('is-active', index <= currentStepIndex);
    });

    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === total - 1;

    backButton.style.visibility = isFirstStep ? 'hidden' : 'visible';
    nextButton.style.display = isLastStep ? 'none' : 'inline-flex';
    submitButton.style.display = isLastStep ? 'inline-flex' : 'none';

    if (statusBox) {
      statusBox.classList.remove('is-visible');
    }

    updateSummaryReview();
  }

  function setFieldValue(name, value) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;
    if (field.type === 'checkbox') {
      field.checked = Boolean(value);
      return;
    }
    field.value = value || '';
  }

  function showError(fieldName, message) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    field.classList.add('form-error');
    const errorNode = field.closest('.field')?.querySelector('.error-text');
    if (errorNode) errorNode.textContent = message;
  }

  function clearError(fieldName) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    field.classList.remove('form-error');
    const errorNode = field.closest('.field')?.querySelector('.error-text');
    if (errorNode) errorNode.textContent = '';
  }

  function validateCurrentStep() {
    const requiredMap = {
      0: ['treatmentCategory', 'preferredTreatment', 'visitType'],
      1: ['preferredDate', 'preferredTimeWindow', 'consultationFormat', 'practitionerType'],
      2: ['fullName', 'email', 'phone', 'contactMethod'],
      3: ['consent']
    };

    const fields = requiredMap[currentStepIndex] || [];
    let foundInvalid = null;

    fields.forEach((fieldName) => {
      clearError(fieldName);
      const value = getFieldValue(fieldName);

      if (fieldName === 'treatmentCategory' && !value) {
        showError(fieldName, 'Please select a treatment category.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'preferredTreatment' && !value) {
        showError(fieldName, 'Please select a treatment.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'preferredTreatment' && value) {
        const category = getFieldValue('treatmentCategory');
        const treatment = TREATMENTS.find((item) => item.id === value || item.name === value || item.slug === value);
        if (category && treatment && treatment.category !== category) {
          showError(fieldName, 'Please choose a treatment from the selected category.');
          if (!foundInvalid) foundInvalid = fieldName;
        }
      }

      if (fieldName === 'visitType' && !value) {
        showError(fieldName, 'Please tell us whether this is your first visit or a return.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'preferredDate' && !value) {
        showError(fieldName, 'Please choose a preferred date.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'preferredDate' && value) {
        const dateValue = new Date(value + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (dateValue < today) {
          showError(fieldName, 'Please choose a date that is not in the past.');
          if (!foundInvalid) foundInvalid = fieldName;
        }
      }

      if (fieldName === 'preferredTimeWindow' && !value) {
        showError(fieldName, 'Please select a preferred time window.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'consultationFormat' && !value) {
        showError(fieldName, 'Please choose how you would like to be contacted.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'practitionerType' && !value) {
        showError(fieldName, 'Please choose a practitioner preference.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'fullName' && !value) {
        showError(fieldName, 'Please enter your full name.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'email' && !value) {
        showError(fieldName, 'Please enter your email address.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'email' && value) {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!validEmail) {
          showError(fieldName, 'Please enter a valid email address.');
          if (!foundInvalid) foundInvalid = fieldName;
        }
      }

      if (fieldName === 'phone' && !value) {
        showError(fieldName, 'Please add a contact number.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'phone' && value) {
        const safePhone = value.replace(/[\s()+\-]/g, '');
        if (safePhone.length < 7 || !/^[0-9+()\-\s]+$/.test(value)) {
          showError(fieldName, 'Please enter a valid contact number with reasonable length and allowed characters.');
          if (!foundInvalid) foundInvalid = fieldName;
        }
      }

      if (fieldName === 'contactMethod' && !value) {
        showError(fieldName, 'Please select a preferred contact method.');
        if (!foundInvalid) foundInvalid = fieldName;
      }

      if (fieldName === 'consent' && !value) {
        showError(fieldName, 'Consent is required before submitting.');
        if (!foundInvalid) foundInvalid = fieldName;
      }
    });

    if (foundInvalid) {
      const target = form.querySelector(`[name="${foundInvalid}"]`);
      if (target) target.focus();
      return false;
    }

    return true;
  }

  function validateTreatmentExists() {
    const treatmentName = getFieldValue('preferredTreatment');
    if (!treatmentName) return true;
    const found = TREATMENTS.some((item) => item.id === treatmentName || item.slug === treatmentName || item.name === treatmentName);
    if (!found) {
      showError('preferredTreatment', 'Please choose a treatment from the catalogue.');
      form.querySelector('[name="preferredTreatment"]').focus();
      return false;
    }
    clearError('preferredTreatment');
    return true;
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (!validateCurrentStep()) return;
      if (!validateTreatmentExists()) return;
      currentStepIndex = Math.min(currentStepIndex + 1, steps.length - 1);
      updateStepUI();
    });
  }

  if (backButton) {
    backButton.addEventListener('click', () => {
      currentStepIndex = Math.max(currentStepIndex - 1, 0);
      updateStepUI();
    });
  }

  if (submitButton) {
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();
      if (!validateCurrentStep()) return;
      if (!validateTreatmentExists()) return;
      if (!consentCheckbox || !consentCheckbox.checked) {
        showError('consent', 'Consent is required before submitting.');
        consentCheckbox.focus();
        return;
      }
      clearError('consent');

      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      const payload = submitEnquiry({
        category: getFieldValue('treatmentCategory'),
        treatmentInterest: getFieldValue('preferredTreatment'),
        newOrReturning: getFieldValue('visitType'),
        preferredContactMethod: getFieldValue('contactMethod'),
        requestedDate: getFieldValue('preferredDate'),
        requestedTimeWindow: getFieldValue('preferredTimeWindow'),
        enquiryStatus: 'New',
        name: getFieldValue('fullName'),
        email: getFieldValue('email'),
        phone: getFieldValue('phone'),
        message: getFieldValue('message'),
        consent: getFieldValue('consent')
      });

      await new Promise((resolve) => setTimeout(resolve, 550));

      submitButton.disabled = false;
      submitButton.textContent = 'Submit enquiry';

      if (statusBox) {
        statusBox.innerHTML = '<strong>Demo enquiry received.</strong> This simulation confirms the lead form validated successfully. It is a demonstration only and does not create a confirmed appointment or save patient data in browser storage.';
        statusBox.classList.add('is-visible');
      }

      form.reset();
      currentStepIndex = 0;
      updateStepUI();

      if (payload && payload.treatmentInterest) {
        const reviewSummary = document.getElementById('summaryReview');
        if (reviewSummary) {
          reviewSummary.innerHTML = '<div class="summary-item"><span>Request</span><strong>Demo success</strong></div>';
        }
      }
    });
  }

  const preferredTreatment = form.querySelector('[name="preferredTreatment"]');
  const preferredCategory = form.querySelector('[name="treatmentCategory"]');

  if (preferredCategory) {
    const categories = [...new Set(TREATMENTS.map((item) => item.category))];
    preferredCategory.innerHTML = `<option value="">Select a category</option>${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}`;
    preferredCategory.addEventListener('change', () => {
      const category = preferredCategory.value;
      const options = category ? TREATMENTS.filter((item) => item.category === category) : TREATMENTS;
      if (preferredTreatment) {
        preferredTreatment.innerHTML = `<option value="">Select a treatment</option>${options.map((item) => `<option value="${item.id}">${item.name}</option>`).join('')}`;
      }
      updateSummaryReview();
    });
  }

  if (preferredTreatment) {
    preferredTreatment.innerHTML = '<option value="">Select a treatment</option>';
    preferredTreatment.addEventListener('change', updateSummaryReview);
  }

  updateStepUI();

  form.addEventListener('input', () => {
    if (statusBox) {
      statusBox.classList.remove('is-visible');
    }
    form.querySelectorAll('.form-error').forEach((input) => input.classList.remove('form-error'));
    updateSummaryReview();
  });

  form.addEventListener('change', () => {
    if (statusBox) {
      statusBox.classList.remove('is-visible');
    }
    updateSummaryReview();
  });
}

function submitEnquiry(payload) {
  const required = ['treatmentInterest', 'category', 'newOrReturning', 'preferredContactMethod', 'requestedDate', 'requestedTimeWindow', 'name', 'email', 'phone'];
  const missing = required.filter((field) => !payload[field] || !String(payload[field]).trim());

  if (missing.length) {
    throw new Error(`Missing required enquiry values: ${missing.join(', ')}`);
  }

  const normalized = {
    treatmentInterest: payload.treatmentInterest,
    category: payload.category,
    newOrReturning: payload.newOrReturning,
    preferredContactMethod: payload.preferredContactMethod,
    requestedDate: payload.requestedDate,
    requestedTimeWindow: payload.requestedTimeWindow,
    enquiryStatus: payload.enquiryStatus || 'New',
    leadSource: 'website-demo',
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message || '',
    consent: Boolean(payload.consent)
  };

  return normalized;
}

function renderStars(rating) {
  const filled = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => `<span aria-hidden="true">${index < filled ? '★' : '☆'}</span>`).join('');
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}
