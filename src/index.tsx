import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import * as React from 'react';

export type CookieDialogProps = {
  visible: boolean;
  categories: CookieDialogCategory[];
  onAccept: (categories: CookieDialogCategory[]) => void;
} & CookieDialogStringOrComponents;

type StringOrComponent = string | (() => JSX.Element);

export interface CookieDialogCategory {
  key: string;
  title: StringOrComponent;
  description: StringOrComponent;
  isNecessary?: boolean;
}

export interface CookieDialogStringOrComponents {
  // Main Dialog
  mainDialogTitle: string;
  mainDialogDescription: StringOrComponent;
  mainDialogAccept: string;
  mainDialogOptions: string;
  // Options Dialog
  optionsDialogTitle: string;
  optionsDialogDescriptionAbove: StringOrComponent;
  optionsDialogDescriptionBelow: StringOrComponent;
  optionsDialogSave: string;
  optionsDialogAccept: string;
}

export const cookieDialogStringDefaultsGerman: CookieDialogStringOrComponents = {
  mainDialogTitle: 'Cookies',
  mainDialogDescription:
    'Wir nutzen Cookies, um Ihnen die bestmögliche Nutzung unserer Webseite zu ' +
    'ermöglichen und unsere Kommunikation mit Ihnen zu verbessern. Wir berücksichtigen hierbei ' +
    'Ihre Präferenzen und verarbeiten Daten für Marketing, Analytics und Personalisierung nur, ' +
    'wenn Sie uns durch Klicken auf "Zustimmen und weiter" Ihre Einwilligung geben oder über den ' +
    'Button „Cookie Präferenzen setzen“ eine spezifische Auswahl festlegen. Sie können Ihre ' +
    'Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Informationen zu den einzelnen ' +
    'verwendeten Cookies sowie die Widerrufsmöglichkeit finden Sie in unserer Datenschutzerklärung und in der Cookie-Richtlinie.',
  mainDialogOptions: 'Einstellungen',
  mainDialogAccept: 'Zustimmen und Weiter',
  optionsDialogTitle: 'Ihre Einstellungen zu Cookies für diese Website',
  optionsDialogDescriptionAbove:
    'Wir nutzen Cookies, um Ihnen die bestmögliche Nutzung unserer Webseite zu ermöglichen und ' +
    'unsere Kommunikation mit Ihnen zu verbessern. Treffen Sie hier Ihre persönliche Präferenz:',
  optionsDialogDescriptionBelow:
    'Detaillierte Informationen zu den Cookies und eingesetzten Tracking Tools können Sie unserer ' +
    'Datenschutzerklärung oder der Cookie-Richtlinie entnehmen. Sie können Ihre gesetzte Präferenz ' +
    'jederzeit anpassen, indem Sie diesen Cookie Manager über den Link in der Datenschutzerklärung aufrufen.',
  optionsDialogSave: 'Auswahl speichern',
  optionsDialogAccept: 'Alle akzeptieren',
};

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    marginBottom: '8px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '12px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button:first-child': {
        marginBottom: '12px',
      },
    },
  },
  cookieCategories: {
    margin: '0 4px',
  },
  cookieCategory: {
    display: 'flex',
    flexDirection: 'column',
    margin: '12px 8px',
  },
  cookieCategoryDescription: {
    fontSize: '11px',
  },
}));

const StringOrComponent = (props: {
  soc: StringOrComponent;
  variant: Variant;
  className?: string;
}) => {
  if (typeof props.soc === 'string') {
    return (
      <Typography variant={props.variant} className={props.className}>
        {props.soc}
      </Typography>
    );
  } else {
    return <props.soc />;
  }
};

export const CookieDialog = (props: CookieDialogProps) => {
  const classes = useStyles(props);
  const socs: CookieDialogStringOrComponents = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [visible, setVisible] = React.useState(props.visible);
  const [optionsVisible, setOptionsVisible] = React.useState(false);
  const [categories, setCategories] = React.useState<{
    [key: string]: boolean;
  }>({});

  React.useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleOptionsClick = () => {
    setOptionsVisible(true);
  };

  const handleAccept = () => {
    props.onAccept(
      props.categories.filter(
        category => categories[category.key] ?? category.isNecessary ?? false
      )
    );
  };

  const handleAcceptAll = () => {
    props.onAccept(props.categories);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategories = { ...categories };
    newCategories[event.target.name] = event.target.checked;
    setCategories(newCategories);
  };

  return (
    <Dialog open={visible} fullScreen={fullScreen} scroll="paper">
      {!optionsVisible && (
        <>
          <DialogTitle>{socs.mainDialogTitle}</DialogTitle>
          <DialogContent>
            <StringOrComponent
              soc={socs.mainDialogDescription}
              variant="body1"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleOptionsClick}>
              <StringOrComponent soc={socs.mainDialogOptions} variant="body1" />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAcceptAll}
            >
              <StringOrComponent soc={socs.mainDialogAccept} variant="body1" />
            </Button>
          </DialogActions>
        </>
      )}
      {optionsVisible && (
        <>
          <DialogTitle>{socs.optionsDialogTitle}</DialogTitle>
          <DialogContent>
            <StringOrComponent
              soc={socs.optionsDialogDescriptionAbove}
              variant="body1"
            />
            <div className={classes.cookieCategories}>
              {props.categories?.map((category, index) => {
                return (
                  <div className={classes.cookieCategory} key={index}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={
                            categories[category.key] ??
                            category.isNecessary ??
                            false
                          }
                          onChange={
                            category.isNecessary ?? false
                              ? undefined
                              : handleChange
                          }
                          name={category.key}
                          color="primary"
                        />
                      }
                      label={
                        <StringOrComponent
                          soc={category.title}
                          variant="body1"
                        />
                      }
                      labelPlacement="end"
                    />
                    <StringOrComponent
                      soc={category.description}
                      variant="body2"
                      className={classes.cookieCategoryDescription}
                    />
                  </div>
                );
              })}
            </div>
            <StringOrComponent
              soc={socs.optionsDialogDescriptionBelow}
              variant="body1"
            />
          </DialogContent>
          <DialogActions>
            <Box marginRight="auto">
              <Button variant="text" onClick={handleAccept} size="small">
                <StringOrComponent
                  soc={socs.optionsDialogSave}
                  variant="body1"
                />
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAcceptAll}
            >
              <StringOrComponent
                soc={socs.optionsDialogAccept}
                variant="body1"
              />
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
