define(['models/departuresModel'], function (departuresModel) {
    describe('Departures Model', function () {
        beforeEach(function () {
            departuresModel.clear();
        });
        it('Usual url', function () {
            departuresModel.set({
                'stationname': 'Simonis',
                'year': 2013,
                'month': '11',
                'day': '05',
                'hour': '12',
                'minutes': '00'
            });
            expect(departuresModel.url()).toBe('https://irail.p.mashape.com/NMBS/Departures/Simonis/2013/11/05/12/00.json');
        });
    })
});