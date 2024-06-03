import { createSelector } from 'reselect';

import { States } from '../constants';
import { rootSelector } from './';

export const campaignSelector = createSelector(rootSelector, state => state[States.CAMPAIGN]);
export const isLoadingSelector = createSelector(campaignSelector, data => data.loading);
export const getDataSelector = createSelector(campaignSelector, data => data.data);
export const getAllStatusSelector = createSelector(campaignSelector, data => data.status);
export const getSelectedCampaignGroupProperties = createSelector(campaignSelector, data => data.selectedCampaignGroup);
export const getAllCurrentProperties = createSelector(campaignSelector, data => data.properties);
export const getSavedProperties = createSelector(campaignSelector, data => data.savedProretries);
export const getSelectedCampaignStatus = createSelector(campaignSelector, data => data.selectedCampaignStatus);
export const getFoundCampaignGroups = createSelector(campaignSelector, data => data.foundCampaigns);
export const getTotalCampaignsCount = createSelector(campaignSelector, data => data.totalCampaignsCount);
export const getCampaignsToggle = createSelector(campaignSelector, data => data.campaignsToggle);
export const getCampaignsFilterByStatus = createSelector(campaignSelector, data => data.filterByStatus);
