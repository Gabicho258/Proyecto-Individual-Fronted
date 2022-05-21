export const cloudinary_constant = (upload_preset) => {
  return {
    cloudName: "hotelapp",
    uploadPreset: upload_preset,
    sources: ["local"],
    showAdvancedOptions: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#8a36d9",
        sourceBg: "#FFFFFF",
        windowBorder: "#8a36d9",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#FFDB92",
        menuIcons: "#FFFFFF",
        link: "#8a36d9",
        action: "#FF2929",
        inProgress: "#000000",
        complete: "#8a36d9",
        error: "#c43737",
        textDark: "#000000",
        textLight: "#FFFFFF",
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true,
        },
      },
    },
  };
};
