const oldAssetsBase = "/old-portfolio-assets";

export const assetPaths = {
  oldBase: oldAssetsBase,

  personal: {
    heroPhoto: "/Grad.jpg",
  },

  profile: {
    avatar: "/developer-workspace.svg",
  },

  logos: {
    nuDasma: `${oldAssetsBase}/logos/nu-dasma-logo.png`,
    perpetualHelp: `${oldAssetsBase}/logos/perpetual-help-logo.png`,
  },

  resume: {
    jayMarkResume: `${oldAssetsBase}/resume/JayMark_Apelado_Resume.pdf`,
    jayMarkApeladoResume: `${oldAssetsBase}/resume/JayMarkApelado_Resume.pdf`,
  },

  projects: {
    talkready: {
      cover: `${oldAssetsBase}/projects/talkready_web/talkready_landingpage.png`,
      dashboard: `${oldAssetsBase}/projects/talkready_web/talkready_admindb.png`,
      aiChatbot: `${oldAssetsBase}/projects/talkready_web/talkready_homepage.png`,
      courses: `${oldAssetsBase}/projects/talkready_web/talkready_trainerdb.png`,

      landingPage: `${oldAssetsBase}/projects/talkready_web/talkready_landingpage.png`,
      homepage: `${oldAssetsBase}/projects/talkready_web/talkready_homepage.png`,
      adminDashboard: `${oldAssetsBase}/projects/talkready_web/talkready_admindb.png`,
      trainerDashboard: `${oldAssetsBase}/projects/talkready_web/talkready_trainerdb.png`,
      myReports: `${oldAssetsBase}/projects/talkready_web/talkready_my-reports.png`,

      gallery: [
        {
          src: `${oldAssetsBase}/projects/talkready_web/talkready_homepage.png`,
          alt: "TalkReady homepage interface",
        },
        {
          src: `${oldAssetsBase}/projects/talkready_web/talkready_admindb.png`,
          alt: "TalkReady admin dashboard interface",
        },
        {
          src: `${oldAssetsBase}/projects/talkready_web/talkready_trainerdb.png`,
          alt: "TalkReady trainer dashboard interface",
        },
        {
          src: `${oldAssetsBase}/projects/talkready_web/talkready_my-reports.png`,
          alt: "TalkReady progress reports interface",
        },
      ],

      demoVideo: "",
    },

    talkreadyMobile: {
      studentDashboardVideo:
        "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966469/Student_TR_adewru.mp4",
      trainerDashboardVideo:
        "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966464/Trainer_TR_o66ngi.mp4",
    },

    eborrwNu: {
      borrowerInterfaceVideo:
        "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966469/Borrower_Eborrow_fjic5d.mp4",
      itAdminPanelVideo:
        "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966467/ITAdmin_Eborrow_e8cm02.mp4",
    },

    mobileApps: {
      talkreadyMobile: {
        cover: `${oldAssetsBase}/projects/talkready_web/talkready_homepage.png`,
        video:
          "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966469/Student_TR_adewru.mp4",
        studentDashboardVideo:
          "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966469/Student_TR_adewru.mp4",
        trainerDashboardVideo:
          "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966464/Trainer_TR_o66ngi.mp4",
      },

      eborrwNu: {
        cover: `${oldAssetsBase}/media/XmasIT.png`,
        video:
          "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966469/Borrower_Eborrow_fjic5d.mp4",
        borrowerInterfaceVideo:
          "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966469/Borrower_Eborrow_fjic5d.mp4",
        itAdminPanelVideo:
          "https://res.cloudinary.com/dy19jfrdb/video/upload/v1762966467/ITAdmin_Eborrow_e8cm02.mp4",
      },
    },

    internshipSystems: {
      crmPipeline: {
        cover:
          "https://res.cloudinary.com/dmucxva6s/video/upload/so_2,q_auto,f_auto/v1780468188/crm_naaz5y.jpg",

        video:
          "https://res.cloudinary.com/dmucxva6s/video/upload/q_auto/f_auto/v1780468188/crm_naaz5y.mp4",
      },

      virtualOffice: {
        cover:
          "https://res.cloudinary.com/dmucxva6s/video/upload/so_2,q_auto,f_auto/v1780468197/virtoff_sdayhi.jpg",

        video:
          "https://res.cloudinary.com/dmucxva6s/video/upload/q_auto/f_auto/v1780468197/virtoff_sdayhi.mp4",
      },

      ticketSupport: {
        cover:
          "https://res.cloudinary.com/dmucxva6s/video/upload/so_2,q_auto,f_auto/v1780468194/ticketingsys_woifcp.jpg",

        video:
          "https://res.cloudinary.com/dmucxva6s/video/upload/q_auto/f_auto/v1780468194/ticketingsys_woifcp.mp4",
      },

      payseraInventory: {
        cover:
          "https://res.cloudinary.com/dmucxva6s/video/upload/so_2,q_auto,f_auto/v1780468200/payseraIMS_wm1pqn.jpg",

        video:
          "https://res.cloudinary.com/dmucxva6s/video/upload/q_auto/f_auto/v1780468200/payseraIMS_wm1pqn.mp4",
      },
    },

    designWorks: {
      bulldogPay: `${oldAssetsBase}/Figma/BulldogPay/Bulldog Pay.png`,
      bulldogPayHome: `${oldAssetsBase}/Figma/BulldogPay/Home Screen.png`,
      bulldogPayQrPayment: `${oldAssetsBase}/Figma/BulldogPay/Qr Payment.png`,
      bulldogPayTransactionHistory: `${oldAssetsBase}/Figma/BulldogPay/Transaction History.png`,

      youtubeMusic: `${oldAssetsBase}/Figma/YTMusic/YT MUSIC.png`,
      youtubeMusicHigh: `${oldAssetsBase}/Figma/YTMusic/High.png`,
      youtubeMusicLow: `${oldAssetsBase}/Figma/YTMusic/Low.png`,

      photoshopWorkOne: `${oldAssetsBase}/Photoshop/ACT1.png`,
      photoshopWorkTwo: `${oldAssetsBase}/Photoshop/ACT1(2).png`,
      photoshopWorkThree: `${oldAssetsBase}/Photoshop/ACT2.png`,
      photoshopWorkFour: `${oldAssetsBase}/Photoshop/ACT3.png`,
      photoshopWorkFive: `${oldAssetsBase}/Photoshop/ACT4.png`,
    },
  },

  certifications: {
    installingConfiguringComputerSystems: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_Installing_and_Configuring_Computer_Systems-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_Installing_and_Configuring_Computer_Systems.pdf`,
    },

    introductionToCss: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_Introduction_to_CSS-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_Introduction_to_CSS.pdf`,
    },

    maintainingComputerSystemsAndNetworks: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_Maintaining_Computer_Systems_and_Networks-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_Maintaining_Computer_Systems_and_Networks.pdf`,
    },

    settingUpComputerNetworks: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_Setting_Up_Computer_Networks-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_Setting_Up_Computer_Networks.pdf`,
    },

    settingUpComputerServers: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_Setting_Up_Computer_Servers-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_Setting_Up_Computer_Servers.pdf`,
    },

    smartAndroidMobileAppsDevelopment: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_SMART_Android_Mobile_Apps_Development_for_Beginners-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_SMART_Android_Mobile_Apps_Development_for_Beginners.pdf`,
    },

    smartTechnopreneurship: {
      image: `${oldAssetsBase}/certificates/images/APELADO_Ecert_SMART_Technopreneurship_101-1.png`,
      pdf: `${oldAssetsBase}/certificates/APELADO_Ecert_SMART_Technopreneurship_101.pdf`,
    },
  },

  activities: {
    btsSalubong: `${oldAssetsBase}/media/BTS_Salubong.png`,
    buwanNgWika: `${oldAssetsBase}/media/BuwanNgWika.png`,
    danceClass: `${oldAssetsBase}/media/DanceClass.png`,
    salubongVibin: `${oldAssetsBase}/media/Salubong_Vibin.png`,
    wikangFilipino: `${oldAssetsBase}/media/WikangFil.jpg`,
    xmasIt: `${oldAssetsBase}/media/XmasIT.png`,

    nuDVibinCampusTour: {
      preview: `${oldAssetsBase}/media/Salubong_Vibin.png`,
      video: "",
    },

    buwanNgWikaTraditionalDances: {
      preview: `${oldAssetsBase}/media/BuwanNgWika.png`,
      video: "",
    },

    pandanggoSayawSaBangko: {
      preview: `${oldAssetsBase}/media/DanceClass.png`,
      video: "",
    },
  },

  achievements: {
    base: `${oldAssetsBase}/achievements`,
  },
};