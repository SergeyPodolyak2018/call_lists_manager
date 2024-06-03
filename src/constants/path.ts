export const MainPath = '/customer/ui';
export enum allPaths {
  login = 'login',
  campaigns = 'campaigns',
  dialingSession = 'campaigns/dialing_session',
  callingLists = 'calling-lists',
  contactLists = 'lists/contact_lists',
  outboundSchedules = 'outbound-schedules',
  outboundSchedulesCreateEdit = 'outbound-schedules',
  other = 'other_lists',
}

export enum allPathsKeys {
  login = 'login',
  campaigns = 'campaigns/',
  dialingSession = 'campaigns/dialing_session',
  callingLists = 'calling-lists',
  contactLists = 'lists/contact_lists',
  other = 'do-not-call-list',
  other2 = 'request-log',
}
export enum excludePath {
  info = 'info',
  login = 'login',
}

export enum allPathsWithError {
  login = 'Login Error',
  campaigns = 'Campaigns Error',
  dialingSession = 'Dialing Session Error',
  callingLists = 'Calling Lists Error',
  contactLists = 'Contact Lists Error',
  other = 'Other Lists Error',
  other2 = 'Other Lists Error',
}
