import { apiCall } from '../../../shared/utils/api'

export const startSession = suppressGoogleAnalytics => (
  dispatch => {
    apiCall({
      onSuccessCB: session => {},
      onFailCB: () => {},
      url: '/v3/session',
      type: 'post',
      description: 'creating a session',
      showLoading: true
    }, dispatch)
  }
)
