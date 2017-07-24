/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  startProjectHeader: {
    id: 'boilerplate.containers.HomePage.start_project.header',
    defaultMessage: 'Songs Feed',
  },
  startProjectMessage: {
    id: 'boilerplate.containers.HomePage.start_project.message',
    defaultMessage: 'Search, filter and respond to your songs!',
  },
  trymeHeader: {
    id: 'boilerplate.containers.HomePage.tryme.header',
    defaultMessage: 'Filters',
  },
  trymeMessage: {
    id: 'boilerplate.containers.HomePage.tryme.message',
    defaultMessage: 'Filter songs by description:',
  },
  trymeAtPrefix: {
    id: 'boilerplate.containers.HomePage.tryme.atPrefix',
    defaultMessage: '@',
  },
});
