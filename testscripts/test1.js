log.info('test log');

subscribe('test//incr', function (topic, val) {
    val += 1;
    setValue(topic, val);
});

subscribe('test/target', () => {
    setTimeout(() => {
        log.info('test/target age', age('test/target'));
        log.info('test/target lc', getProp('test/target', 'lc'), now());
    }, 5000);
});

link('test/src', 'test/target');
link(['test/src1', 'test/src2'], ['test/target1', 'test/target2']);

schedule('* * * * *', () => {
    log.info('schedule callback');
    setTimeout(function () {
        throw new Error('test exception!');
    }, 2000);
});

subscribe('test/condition', 'val=="muh"', (topic, val) => {
    log.info(topic, val)
});

subscribe('test/change', {change: true}, (topic, val) => {
    log.info(topic, val)
});

subscribe(/regexp/, (topic, val) => {
    log.info(topic, val);
});



log.info(require('./lib/libtest.js'));

sunSchedule('sunrise', () => {
    log.info('sunrise');
});

subscribe('test1', (topic, val) => {
    log.info(topic, getValue('test1'));
});

publish(['test1', 'test2'], {val: true});