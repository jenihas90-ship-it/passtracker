const initialApplications = [
  {
    applicationNumber: 'EP-2024-89211',
    applicantName: 'Abebe Bikila Kebede',
    phoneNumber: '+251911223344',
    currentStatus: 'Ready for Pickup',
    statusHistory: [
      { status: 'Submitted', updatedAt: new Date('2024-10-10T08:30:00Z') },
      { status: 'Biometrics Pending', updatedAt: new Date('2024-10-12T10:15:00Z') },
      { status: 'Processing', updatedAt: new Date('2024-10-18T14:00:00Z') },
      { status: 'Printed', updatedAt: new Date('2024-10-25T11:45:00Z') },
      { status: 'Ready for Pickup', updatedAt: new Date('2024-11-01T09:00:00Z') }
    ],
    officeLocation: 'Addis Ababa Main (Kirkos)',
    discrepancyNotes: null
  },
  {
    applicationNumber: 'EP-2024-45192',
    applicantName: 'Chaltu Desta Gemechu',
    phoneNumber: '+251922334455',
    currentStatus: 'Processing',
    statusHistory: [
      { status: 'Submitted', updatedAt: new Date('2024-10-20T09:00:00Z') },
      { status: 'Biometrics Pending', updatedAt: new Date('2024-10-24T13:30:00Z') },
      { status: 'Processing', updatedAt: new Date('2024-10-30T16:20:00Z') }
    ],
    officeLocation: 'Jimma Branch',
    discrepancyNotes: null
  },
  {
    applicationNumber: 'EP-2024-73819',
    applicantName: 'Yohannes Haile Selassie',
    phoneNumber: '+251933445566',
    currentStatus: 'Biometrics Pending',
    statusHistory: [
      { status: 'Submitted', updatedAt: new Date('2024-11-02T10:00:00Z') },
      { status: 'Biometrics Pending', updatedAt: new Date('2024-11-04T11:15:00Z') }
    ],
    officeLocation: 'Hawassa Branch',
    discrepancyNotes: null
  },
  {
    applicationNumber: 'EP-2024-19283',
    applicantName: 'Fatuma Mohammed Ahmed',
    phoneNumber: '+251944556677',
    currentStatus: 'Printed',
    statusHistory: [
      { status: 'Submitted', updatedAt: new Date('2024-10-15T08:00:00Z') },
      { status: 'Biometrics Pending', updatedAt: new Date('2024-10-18T09:30:00Z') },
      { status: 'Processing', updatedAt: new Date('2024-10-22T15:00:00Z') },
      { status: 'Printed', updatedAt: new Date('2024-11-05T14:30:00Z') }
    ],
    officeLocation: 'Dire Dawa Branch',
    discrepancyNotes: null
  },
  {
    applicationNumber: 'EP-2024-60124',
    applicantName: 'Biruk Tadesse Wolde',
    phoneNumber: '+251955667788',
    currentStatus: 'Submitted',
    statusHistory: [
      { status: 'Submitted', updatedAt: new Date('2024-11-06T14:10:00Z') }
    ],
    officeLocation: 'Bahir Dar Branch',
    discrepancyNotes: null
  },
  {
    applicationNumber: 'EP-2024-38102',
    applicantName: 'Almaz Bekele Feyisa',
    phoneNumber: '+251966778899',
    currentStatus: 'Discrepancy Flagged',
    statusHistory: [
      { status: 'Submitted', updatedAt: new Date('2024-10-14T09:00:00Z') },
      { status: 'Biometrics Pending', updatedAt: new Date('2024-10-17T11:00:00Z') },
      { status: 'Discrepancy Flagged', updatedAt: new Date('2024-10-28T16:00:00Z') }
    ],
    officeLocation: 'Jimma Branch',
    discrepancyNotes: 'Applicant reported name spelling variation between birth certificate and passport registration (Bekel vs Bekele). Under administrative review.'
  }
];

module.exports = initialApplications;
