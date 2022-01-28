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

export type InsiderBackEndForm = Omit<InsiderForm, "devices"> & {
  "#": string;
  date: string;
  devices_windows: boolean;
  devices_android: boolean;
  devices_ios: boolean;
  joined: string;
};

export type InsiderFrontEndForm = InsiderForm & {
  confirm: boolean;
  confirmRights: boolean;
};

export type InsiderResponse = {
  success: boolean;
};
