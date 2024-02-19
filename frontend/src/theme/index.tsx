import { createTheme } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    displayLargePrimary: React.CSSProperties;
    displayMediumPrimary: React.CSSProperties;
    subheadingPrimary: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    displayLargePrimary: React.CSSProperties;
    displayMediumPrimary: React.CSSProperties;
    subheadingPrimary: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayLargePrimary: true;
    displayMediumPrimary: true;
    subheadingPrimary: true;
  }
}

export const colors = {
  actionPrimaryDefault: '#26C281',
  textDefault: '#0F1310',
  textSubdued: '#6F7170',
  borderDefault: '#8C9196',
  borderSubdued: '#C9CCCF',
  iconDefault: '#6F7170',
  surfaceDefault: '#FFFFFF',
  decorativeSurfaceOne: '#9EC59B',
  decorativeTextOne: '#194516',
  actionPrimaryDisabled: '#E4F6ED',
  borderSuccessSubdued: '#BDE9D2',
  textSuccess: '#008347',
  footerBackground: '#F7FCFA',
  borderSubduedLight: '#E4E5E7',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.actionPrimaryDefault,
      contrastText: colors.surfaceDefault,
    },
    secondary: {
      main: colors.textSubdued,
    },
    // Define secondary color if needed
    // Define error color if needed
    background: {
      default: colors.surfaceDefault,
      paper: colors.footerBackground,
    },
    text: {
      primary: colors.textDefault,
      secondary: colors.textSubdued,
    },
    action: {
      disabledBackground: colors.actionPrimaryDisabled,
      disabled: colors.borderSuccessSubdued,
    },
    success: {
      main: colors.textSuccess,
    },
    grey: {
      500: colors.borderDefault,
    },
  },
  typography: {
    fontFamily: 'Inter',
    h3: {
      fontWeight: 600,
      fontSize: '42px',
      lineHeight: '55px',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '28px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
    },
    button: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
    },
    caption: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
    },
    h6: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
    },
    displayLargePrimary: {
      fontFamily: 'Inter',
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '32px',
      color: colors.textDefault,
      fontFeatureSettings: '\'clig\' off, \'liga\' off',
    },
    displayMediumPrimary: {
      fontFamily: 'Inter',
      fontSize: '26px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '32px',
      color: colors.actionPrimaryDefault,
      fontFeatureSettings: '\'clig\' off, \'liga\' off',
    },
    subheadingPrimary: {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '16px',
    },
    // Include other typography as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          boxShadow: 'none',
          height: '48px',
          borderColor: colors.borderSubdued,
          '&:hover': {
            boxShadow: 'none', // Removes shadow on hover
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '48px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.decorativeSurfaceOne,
          color: colors.decorativeTextOne,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: '48px',
            '& fieldset': {
              borderColor: colors.borderSubdued,
            },
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          fontFeatureSettings: '\'clig\' off, \'liga\' off',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
        },
        ul: {
          '& .MuiPaginationItem-root': {
            color: colors.textSubdued,
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            color: colors.actionPrimaryDefault,
            backgroundColor: 'transparent',
          },
          // set border for first item only
          '& li:last-child .MuiPaginationItem-previousNext': {
            borderRadius: '0 4px 4px 0',
            border: `1px solid ${colors.borderDefault}`,
          },
          '& li:first-child .MuiPaginationItem-previousNext': {
            borderRadius: '4px 0 0 4px',
            border: `1px solid ${colors.borderDefault}`,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.borderSubdued}`,
        },
      },
    },
  },
  // Add other theme customizations if needed
});
