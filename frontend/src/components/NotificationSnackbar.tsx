import { Alert, Snackbar } from '@mui/material';
import { useNotificationStore } from '../store/useNotificationStore';

export function NotificationSnackbar() {
  const notification = useNotificationStore((state) => state.notification);
  const hideNotification = useNotificationStore((state) => state.hideNotification);

  const renderSnackbar = () => {
    if (!notification) return null;

    return (
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ 
          vertical: 'bottom',
          horizontal: 'right' 
        }}
      >
        <Alert 
          onClose={hideNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    );
  };

  return <>{renderSnackbar()}</>;
}
