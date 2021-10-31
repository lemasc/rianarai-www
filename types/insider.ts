export type InsiderForm = {
  name: string;
  surname: string;
  email: string;
  devices: {
    android: boolean;
    ios: boolean;
    windows: boolean;
  };
};

export type InsiderFrontEndForm = InsiderForm & {
  confirm: boolean;
  confirmRights: boolean;
};

export type InsiderResponse = {
  success: boolean;
};
