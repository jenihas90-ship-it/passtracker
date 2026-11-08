export const translations = {
  en: {
    systemTitle: 'PassTrack',
    systemSubtitle: 'Ethiopian Immigration and Citizenship Service (ICS)',
    poCTag: 'Proof of Concept • Innobiz-K Hackathon',
    heroHeading: 'Track Your Ethiopian Passport Status',
    heroSubheading: 'Secure, real-time tracking with multi-factor verification, transparent timeline progression, and instant discrepancy flagging.',
    lowBandwidthBadge: 'Low-Bandwidth Optimized (2G/3G)',
    adminMode: 'ICS Officer Portal',
    citizenMode: 'Citizen Tracker',
    
    // Search Form
    searchCardTitle: 'Multi-Factor Application Verification',
    searchCardDesc: 'To protect applicant privacy and eliminate false matches, both your Application Reference and Registered Phone Number are required.',
    appNumberLabel: 'Application Number',
    appNumberPlaceholder: 'e.g., EP-2024-89211',
    phoneNumberLabel: 'Registered Phone Number',
    phoneNumberPlaceholder: 'e.g., 0911223344 or +251911223344',
    phoneHelpText: 'Accepts 09..., 07..., or +251... formats',
    searchBtn: 'Track Passport',
    searchingBtn: 'Verifying Security Credentials...',
    clearBtn: 'Clear',
    trySampleTitle: 'Quick Demo Test Cases (Click to populate):',

    // Status Pipeline
    pipelineTitle: 'Visual Progression Pipeline',
    statusSubmitted: 'Submitted',
    statusBiometrics: 'Biometrics Pending',
    statusProcessing: 'Processing',
    statusPrinted: 'Printed',
    statusReady: 'Ready for Pickup',
    statusFlagged: 'Discrepancy Flagged',

    // Status Descriptions
    descSubmitted: 'Application and payment verified by ICS intake desk.',
    descBiometrics: 'Awaiting fingerprint and facial photograph capture at branch.',
    descProcessing: 'Under security clearance and official document verification.',
    descPrinted: 'Passport booklet has been securely printed and quality inspected.',
    descReady: 'Passport is ready for collection at your designated branch.',
    descFlagged: 'Administrative discrepancy recorded. Officer review in progress.',

    // Results Card
    resultHeading: 'Official Tracking Record',
    applicantNameLabel: 'Applicant Full Name',
    applicationRefLabel: 'Application Reference',
    pickupBranchLabel: 'Issuing Branch Location',
    registeredPhoneLabel: 'Verified Contact',
    lastUpdateLabel: 'Last Updated',
    timelineAuditTitle: 'Audit Trail & Event History',
    readyForPickupBanner: 'Your passport is ready! Please visit your designated branch with your official kebele ID or birth certificate.',
    readyPickupLocation: 'Pick-up Office',
    readyHours: 'Office Hours: Mon - Fri, 8:30 AM - 4:30 PM EAT',
    printSlipBtn: 'Print Official Status Slip',

    // Discrepancy Reporting
    reportDiscrepancyBtn: 'Report Discrepancy or Name Error',
    discrepancyCardTitle: 'Flag an Application Error',
    discrepancyCardDesc: 'Did you notice an incorrect name spelling, wrong branch location, or data mismatch? Submit an instant ticket to bypass in-person branch queues.',
    discrepancyTypeLabel: 'Discrepancy Category',
    typeSpelling: 'Name Spelling Mismatch',
    typeBranch: 'Incorrect Branch / Office Location',
    typePhone: 'Phone or Contact Number Change',
    typePhoto: 'Photo or Biometric Clarification',
    typeOther: 'Other Administrative Inquiry',
    discrepancyNotesLabel: 'Detailed Explanation',
    discrepancyNotesPlaceholder: 'Please provide exact correct details (e.g., Correct spelling according to birth certificate)...',
    cancelBtn: 'Cancel',
    submitReportBtn: 'Submit Discrepancy Ticket',
    submittingReportBtn: 'Creating Official Ticket...',
    discrepancySuccessHeading: 'Discrepancy Ticket Created',
    discrepancySuccessDesc: 'Your report has been logged into the ICS administrative queue. An ICS officer will reconcile your records.',
    ticketNumberLabel: 'Administrative Ticket ID',
    activeDiscrepancyBanner: 'Attention: This application currently has a flagged discrepancy under administrative review.',

    // Automation / Alerts
    alertTitle: 'Instant Notification Triggered',
    alertSubtitle: 'Make.com Webhook + Telegram Mini-App API dispatched SMS and Telegram alert to citizen.',
    viewTelegramAlertBtn: 'View Telegram Dispatch Preview',

    // Errors
    errorRequired: 'Both Application Number and Phone Number are required.',
    errorGeneric: 'An error occurred while communicating with the ICS server.',

    // Admin Portal
    adminTitle: 'ICS Officer Administrative Command Center',
    adminDesc: 'Manage applicant lifecycles, advance passport pipeline stages, trigger Make.com / Telegram alerts, and review citizen discrepancy flags.',
    tableHeaderAppNo: 'Application #',
    tableHeaderName: 'Applicant Name',
    tableHeaderBranch: 'Branch',
    tableHeaderStatus: 'Current Status',
    tableHeaderActions: 'Update Pipeline',
    statusUpdateSuccess: 'Passport status successfully updated.',
    resetDataBtn: 'Reset Demo Database',
    refreshDataBtn: 'Refresh Records'
  },

  am: {
    systemTitle: 'ፓስትራክ (PassTrack)',
    systemSubtitle: 'የኢትዮጵያ ኢሚግሬሽንና ዜግነት አገልግሎት (ኢዜአ / ICS)',
    poCTag: 'የፅንሰ-ሃሳብ ማረጋገጫ • የኢኖቢዝ-ኬ ሀካቶን',
    heroHeading: 'የኢትዮጵያ ፓስፖርትዎን ሁኔታ ይከታተሉ',
    heroSubheading: 'ባለብዙ-ደረጃ ደህንነቱ የተጠበቀ ፍተሻ፣ ግልጽ የእድገት መስመር እና ፈጣን የስህተት ሪፖርት ማቅረቢያ ስርዓት።',
    lowBandwidthBadge: 'ለቀላል ኢንተርኔት የተመቻቸ (2G/3G)',
    adminMode: 'የኢዜአ ባለሙያዎች ፖርታል',
    citizenMode: 'የዜጎች መከታተያ',

    // Search Form
    searchCardTitle: 'ባለብዙ-ደረጃ የማመልከቻ ማረጋገጫ',
    searchCardDesc: 'የዜጎችን ሚስጥራዊነት ለመጠበቅ እና የስም መዛባትን ለመከላከል ሁለቱንም የማመልከቻ ቁጥር እና የተመዘገበ ስልክ ቁጥር ማስገባት ግዴታ ነው።',
    appNumberLabel: 'የማመልከቻ ቁጥር (Application Number)',
    appNumberPlaceholder: 'ምሳሌ፦ EP-2024-89211',
    phoneNumberLabel: 'የተመዘገበ ስልክ ቁጥር',
    phoneNumberPlaceholder: 'ምሳሌ፦ 0911223344 ወይም +251911223344',
    phoneHelpText: '09..., 07..., ወይም +251... ቅርጸቶችን ይቀበላል',
    searchBtn: 'ፓስፖርቴን ፈልግ',
    searchingBtn: 'ማረጋገጫ በመፈተሽ ላይ...',
    clearBtn: 'አጽዳ',
    trySampleTitle: 'የሙከራ መረጃዎች (ለመምረጥ ጠቅ ያድርጉ)፦',

    // Status Pipeline
    pipelineTitle: 'የሂደት ሂደት መስመር (Progression Pipeline)',
    statusSubmitted: 'ተመዝግቧል (Submitted)',
    statusBiometrics: 'ባዮሜትሪክስ በመጠባበቅ ላይ',
    statusProcessing: 'በማጣራት ላይ (Processing)',
    statusPrinted: 'የታተመ (Printed)',
    statusReady: 'ለመወሰድ ዝግጁ (Ready)',
    statusFlagged: 'ስህተት/ልዩነት ተመዝግቧል',

    // Status Descriptions
    descSubmitted: 'ማመልከቻው እና ክፍያው በኢዜአ የቅበላ ዴስክ ተረጋግጧል።',
    descBiometrics: 'የጣት አሻራ እና የፊት ፎቶ በቅርንጫፍ መስሪያ ቤት ለመነሳት በመጠባበቅ ላይ ነው።',
    descProcessing: 'የሰነድ ማጣራት እና የደህንነት ፍተሻ በሂደት ላይ ነው።',
    descPrinted: 'የፓስፖርት ደብተር በጥራት ታትሞ ተጠናቋል።',
    descReady: 'ፓስፖርትዎ በተመደበው ቅርንጫፍ ለመወሰድ ዝግጁ ነው!',
    descFlagged: 'የመረጃ ልዩነት ወይም ስህተት ተመዝግቧል። በባለሙያዎች እየታየ ነው።',

    // Results Card
    resultHeading: 'ይፋዊ የክትትል መረጃ',
    applicantNameLabel: 'የአመልካች ሙሉ ስም',
    applicationRefLabel: 'የማመልከቻ መለያ ቁጥር',
    pickupBranchLabel: 'የሚሰጥበት ቅርንጫፍ',
    registeredPhoneLabel: 'የተረጋገጠ ስልክ',
    lastUpdateLabel: 'የመጨረሻ ዝመና',
    timelineAuditTitle: 'የሂደት ታሪክ እና ማስታወሻዎች',
    readyForPickupBanner: 'እንኳን ደስ አለዎት! ፓስፖርትዎ ዝግጁ ነው። እባክዎ የቀበሌ መታወቂያዎን ወይም የልደት ካርድዎን ይዘው ወደተመደበው ቅርንጫፍ ይሂዱ።',
    readyPickupLocation: 'የመቀበያ ቅርንጫፍ',
    readyHours: 'የስራ ሰዓት፦ ከሰኞ እስከ አርብ፣ ከጠዋቱ 2:30 እስከ ቀኑ 10:30',
    printSlipBtn: 'ይፋዊ ማረጋገጫ ወረቀት አትም',

    // Discrepancy Reporting
    reportDiscrepancyBtn: 'የስም ወይም የመረጃ ስህተት ሪፖርት አድርግ',
    discrepancyCardTitle: 'የማመልከቻ መረጃ ስህተት ማሳወቂያ',
    discrepancyCardDesc: 'የስም ፊደል መዛባት፣ የተሳሳተ ቅርንጫፍ ወይም ሌላ ችግር አጋጥሞዎታል? በአካል ሳይሄዱ በቀጥታ ቅሬታዎን ያስመዝግቡ።',
    discrepancyTypeLabel: 'የስህተት አይነት',
    typeSpelling: 'የስም ፊደል ወይም የአጻጻፍ ስህተት',
    typeBranch: 'የተሳሳተ የቅርንጫፍ ቢሮ',
    typePhone: 'የስልክ ወይም የመገናኛ አድራሻ ለውጥ',
    typePhoto: 'የፎቶ ወይም የባዮሜትሪክስ ጥያቄ',
    typeOther: 'ሌላ አስተዳደራዊ ጥያቄ',
    discrepancyNotesLabel: 'የስህተቱ ዝርዝር መግለጫ',
    discrepancyNotesPlaceholder: 'ትክክለኛውን መረጃ እዚህ ይጻፉ (ለምሳሌ፦ በልደት ካርዱ ላይ ያለው ትክክለኛ ፊደል)...',
    cancelBtn: 'ሰርዝ',
    submitReportBtn: 'ቅሬታውን አስመዝግብ',
    submittingReportBtn: 'ትኬት በማዘጋጀት ላይ...',
    discrepancySuccessHeading: 'የቅሬታ ትኬት ተፈጥሯል!',
    discrepancySuccessDesc: 'ሪፖርትዎ ለኢዜአ አስተዳደር ቡድን ተልኳል። ባለሙያዎቻችን በአካል መምጣት ሳያስፈልግዎ ያስተካክላሉ።',
    ticketNumberLabel: 'የአስተዳደራዊ ትኬት ቁጥር',
    activeDiscrepancyBanner: 'ማስታወሻ፦ ይህ ማመልከቻ በባለሙያዎች ምርመራ ላይ ያለ የተመዘገበ ልዩነት/ስህተት አለበት።',

    // Automation / Alerts
    alertTitle: 'ፈጣን መልእክት ተልኳል',
    alertSubtitle: 'በMake.com እና በቴሌግራም ሚኒ-አፕ በኩል ለዜጋው የኤስኤምኤስ እና የቴሌግራም ማሳወቂያ ተልኳል።',
    viewTelegramAlertBtn: 'የቴሌግራም ማሳወቂያ ቅድመ እይታ',

    // Errors
    errorRequired: 'የማመልከቻ ቁጥር እና ስልክ ቁጥር ሁለቱም መግባት አለባቸው።',
    errorGeneric: 'ከኢዜአ ሰርቨር ጋር መገናኘት አልተቻለም። እባክዎ እንደገና ይሞክሩ።',

    // Admin Portal
    adminTitle: 'የኢዜአ ባለሙያዎች አስተዳደራዊ መቆጣጠሪያ',
    adminDesc: 'የአመልካቾችን ሁኔታ ይቀይሩ፣ የMake.com/ቴሌግራም መልእክቶችን ይሞክሩ እና የዜጎችን ቅሬታዎች ይመልከቱ።',
    tableHeaderAppNo: 'የማመልከቻ #',
    tableHeaderName: 'የአመልካች ስም',
    tableHeaderBranch: 'ቅርንጫፍ',
    tableHeaderStatus: 'ወቅታዊ ሁኔታ',
    tableHeaderActions: 'ሁኔታ ቀይር',
    statusUpdateSuccess: 'የፓስፖርት ሁኔታ በተሳካ ሁኔታ ተቀይሯል።',
    resetDataBtn: 'መረጃውን ወደ መጀመሪያ መልስ',
    refreshDataBtn: 'አድስ'
  },

  om: {
    systemTitle: 'PassTrack',
    systemSubtitle: 'Tajaajila Godaansaa fi Lammummaa Itoophiyaa (ICS)',
    poCTag: 'Yaada Qorannoo • Innobiz-K Hackathon',
    heroHeading: 'Haala Paaspoortii Keessan Hordofaa',
    heroSubheading: 'Mirkaneessa amansiisaa, sarara guddina ifa ta\'e, fi dogoggora yeroma sanatti gabaasuu.',
    lowBandwidthBadge: 'Interneetii Laafaaf Kan Mijate (2G/3G)',
    adminMode: 'Poortaalii Hojjattoota ICS',
    citizenMode: 'Hordoffii Lammiilee',

    // Search Form
    searchCardTitle: 'Mirkaneessa Galmee Sadarkaa Hedduu',
    searchCardDesc: 'Iccitii lammiilee eeguu fi wal-faallessaa maqaa dhabamsiisuuf, Lakkoofsa Galmee fi Lakkoofsa Bilbilaa lamaanuu galchuun dirqama.',
    appNumberLabel: 'Lakkoofsa Galmee (Application Number)',
    appNumberPlaceholder: 'Fkn: EP-2024-89211',
    phoneNumberLabel: 'Lakkoofsa Bilbilaa Galmaa\'e',
    phoneNumberPlaceholder: 'Fkn: 0911223344 ykn +251911223344',
    phoneHelpText: 'Formatoota 09..., 07..., ykn +251... ni fudhata',
    searchBtn: 'Paaspoortii Kooru',
    searchingBtn: 'Mirkaneessaa Jira...',
    clearBtn: 'Qulqulleessi',
    trySampleTitle: 'Fakkeenyaaf Kan Qophaa\'an (Filachuuf cuqaasaa):',

    // Status Pipeline
    pipelineTitle: 'Sarara Adeemsa Hojii (Pipeline)',
    statusSubmitted: 'Galmaa\'eera (Submitted)',
    statusBiometrics: 'Biomeetiriksii Eegaa Jira',
    statusProcessing: 'Qophiirra Jira (Processing)',
    statusPrinted: 'Maxxanfameera (Printed)',
    statusReady: 'Fudhaaf Qophaa\'eera (Ready)',
    statusFlagged: 'Rakkoon Agarsiifameera',

    // Status Descriptions
    descSubmitted: 'Galmeen fi kaffaltiin ICS tiin mirkanaa\'eera.',
    descBiometrics: 'Asaarri qubaa fi suuraan fuulaa waajjiratti eegamaa jira.',
    descProcessing: 'Ragaan qulqullaa\'aa fi qorannoon eegumsaa adeemsifamaa jira.',
    descPrinted: 'Koppiin paaspoortii qulqullinaan maxxanfameera.',
    descReady: 'Paaspoortiin keessan waajjira filattetti fudhachuuf qophii dha!',
    descFlagged: 'Garaagarummaan ragaa qabameera. Hojjataan qorachaa jira.',

    // Results Card
    resultHeading: 'Ragaa Hordoffii Seera Qabeessa',
    applicantNameLabel: 'Maqaa Guutuu Iyyataa',
    applicationRefLabel: 'Adda Baastuu Galmee',
    pickupBranchLabel: 'Waajjira Fudhatamu',
    registeredPhoneLabel: 'Bilbila Mirkanaa\'e',
    lastUpdateLabel: 'Haaromsame',
    timelineAuditTitle: 'Seenaa Adeemsa Hojii',
    readyForPickupBanner: 'Baga gammaddan! Paaspoortiin keessan qophaa\'eera. Waraqaa eenyummaa gandaa ykn waraqaa dhalootaa qabattanii dhiyaadhaa.',
    readyPickupLocation: 'Waajjira Fudhannaa',
    readyHours: 'Sa\'aatii Hojii: Wiixata - Jimaata, 2:30 - 10:30',
    printSlipBtn: 'Waraqaa Mirkaneessaa Maxxansi',

    // Discrepancy Reporting
    reportDiscrepancyBtn: 'Dogoggora Maqaa ykn Ragaa Gabaasi',
    discrepancyCardTitle: 'Dogoggora Galmee Beeksisi',
    discrepancyCardDesc: 'Dogoggorri qubee maqaa, waajjira sirrii hin taane ykn dhimmi biraa jiraa? Qaamaan osoo hin deemin yeroma sanatti tikeetii galchaa.',
    discrepancyTypeLabel: 'Gosa Dogoggoraa',
    typeSpelling: 'Dogoggora Qubee Maqaa',
    typeBranch: 'Waajjira Dogoggoraa',
    typePhone: 'Jijjiirraa Lakkoofsa Bilbilaa',
    typePhoto: 'Gaaffii Suuraa ykn Biomeetiriksii',
    typeOther: 'Gaaffii Biraa',
    discrepancyNotesLabel: 'Ibsa Bal\'aa',
    discrepancyNotesPlaceholder: 'Ragaa sirrii ta\'e asitti barreessaa...',
    cancelBtn: 'Dhiisi',
    submitReportBtn: 'Tikeetii Ergi',
    submittingReportBtn: 'Tikeetii Qopheessaa Jira...',
    discrepancySuccessHeading: 'Tikeetiin Uumameera!',
    discrepancySuccessDesc: 'Gabaasni keessan hojjattoota ICS tiif darbeera. Qaamaan osoo hin dhiyaatin ni sirreeffama.',
    ticketNumberLabel: 'Lakkoofsa Tikeetii',
    activeDiscrepancyBanner: 'Hubachiisa: Galmeen kun dogoggora qabame qaba; qorannaa jala jira.',

    // Automation / Alerts
    alertTitle: 'Ergaan Hatattamaa Ergameera',
    alertSubtitle: 'Karaa Make.com fi Telegram Mini-App tiin ergaan SMS fi Telegram lammiif ergameera.',
    viewTelegramAlertBtn: 'Ergaa Telegram Ilaali',

    // Errors
    errorRequired: 'Lakkoofsi Galmee fi Lakkoofsi Bilbilaa lamaanuu barbaachisu.',
    errorGeneric: 'Gara sarvaritti qaqqabuun hin danda\'amne.',

    // Admin Portal
    adminTitle: 'Wiirtuu To\'annoo Hojjattoota ICS',
    adminDesc: 'Sadarkaa paaspoortii jijjiiraa, Make.com/Telegram ergaa yaalaa, gabaasa lammiilee qoradhaa.',
    tableHeaderAppNo: 'Galmee #',
    tableHeaderName: 'Maqaa Iyyataa',
    tableHeaderBranch: 'Waajjira',
    tableHeaderStatus: 'Sadarkaa Ammaa',
    tableHeaderActions: 'Jijjiiri',
    statusUpdateSuccess: 'Sadarkaan paaspoortii milkaa\'inaan jijjiirameera.',
    resetDataBtn: 'Ragaa Jalqabaatti Deebisi',
    refreshDataBtn: 'Haaromsi'
  }
};
