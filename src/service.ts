#!/usr/bin/env node
import {DeviceManager, Lamp, NamedTime, Scheduler, Time} from '@genus-machina/screech';
import logger from './logger';

logger.info('setting up devices');

const devices = new DeviceManager();

devices.addDevice(
  new Lamp({
    name: 'northeast-lamp',
    port: 2
  })
);

devices.addDevice(
  new Lamp({
    name: 'southeast-lamp',
    port: 3
  })
);

devices.createAlias('floods', 'northeast-lamp');
devices.createAlias('floods', 'southeast-lamp');

logger.info('setting up schedules');

const MAX_DELAY = 30 * 60 * 1000; // 30 minutes

const schedule = new Scheduler({
  latitude: parseFloat(process.env.LATITUDE!),
  longitude: parseFloat(process.env.LONGITUDE!)
});

schedule.everyDayAt(
  Time.parse('05:00'),
  Scheduler.delayedHandler(
    MAX_DELAY,
    function morning () {
      logger.info('activating floods for 05:00');
      devices.activate('floods');
    }
  )
);

schedule.everyDayAt(
  NamedTime.Dawn,
  function dawn () {
    logger.info('deactivating floods for dawn');
    devices.deactivate('floods');
  }
);

schedule.everyDayAt(
  NamedTime.Dusk,
  function dusk () {
    logger.info('activating floods for dusk');
    devices.activate('floods');
  }
);

schedule.everyDayAt(
  Time.parse('22:15'),
  Scheduler.delayedHandler(
    MAX_DELAY,
    function night () {
      logger.info('deactivating floods for 22:15');
      devices.deactivate('floods');
    }
  )
);

logger.info('setup complete');
