const SERVICE_TYPES = {
  NO_SERVICE: 0,
  DEFAULT_SERVICE: 1,
  FULL_SERVICE: 2,
};

const AVAILABLE_LOCATIONS = {
  CH: {
    countryId: '2cb5bb9f69174e5e980fad846d8016ea',
    currencyId: 'b16403d5867b4f2b9d6ee82a3fd1ae30',
    full: 'Schweiz',
  },
  AT: {
    countryId: '9d351b4dc0e648cd8e23562a0c4b9923',
    currencyId: 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
    full: 'Österreich',
    products: [
      {
        id: '2ec99517afcb4d919dfce968bb32646b',
        title: 'COVID-19 Antigen Rapid Test - SALIVA',
      },
      {
        id: '5d73f402be0b45bbae92c86943844165',
        title: 'COVID-19 Antigen Rapid Test',
      },
      {
        id: 'a7ab68657fe448bc97a6964e3ebdd184',
        title: 'Daily Protective Mask FFP2',
      },
    ],
  },
  DE: {
    countryId: 'ccfc4973e794460f98e82077b2213bf5',
    currencyId: 'b7d2554b0ce847cd82f3ac9bd1c0dfca',
    full: 'Deutschland',
  },
};

const COUNTRIES_FOR_REGISTRATION = {
  Deutschland: 'ccfc4973e794460f98e82077b2213bf5',
  Schweiz: '2cb5bb9f69174e5e980fad846d8016ea',
  Österreich: '9d351b4dc0e648cd8e23562a0c4b9923',
};

const AVAILABLE_SALUTATION = {
  Herr: 'bf7169877ec347de9556d0c41e7e9868',
  Frau: '71d961f849674bfaaf938c402502575e',
  'Keine Angabe': 'e2c081c3353c4683a13a57087349bde3',
};

export default {
  SERVICE_TYPES,
  AVAILABLE_LOCATIONS,
  AVAILABLE_SALUTATION,
  COUNTRIES_FOR_REGISTRATION,
};
