import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './styles/style.css';

import routing from './routing';

import ProfileCtrl from './components/Profile/profileCtrl';
import NewProfileCtrl from './components/NewProfile/newProfileCtrl';
import RootCtrl from './components/rootCtrl';

import Profile from './components/Profile/Profile';
import NewProfile from './components/NewProfile/NewProfile';

import ProfileService from './components/profileService';

angular.module('profiles', [uiRouter])
    .config(routing)
	.controller(`profileCtrl`, ProfileCtrl)
	.controller(`newProfileCtrl`, NewProfileCtrl)
	.controller(`rootCtrl`, RootCtrl)
	.directive(`profile`, Profile)
	.directive(`newProfile`, NewProfile)
	.service(`profileService`, ProfileService);
