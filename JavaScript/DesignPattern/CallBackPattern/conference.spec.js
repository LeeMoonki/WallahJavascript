describe('Conference.attendeeCollection', function() {
    describe('contains(attendee', function() {
        // test contains
    });
    describe('add(attendee)', function() {
        // test add
    });
    describe('remove(attendee)', function() {
        // test remove
    });
    describe('iterate(callback)', function() {
        var collection, callbackSpy;

        // assist function
        function addAttendeesToCollection(attendeeArray) {
            attendeeArray.forEach(function(attendee) {
                collection.add(attendee);
            });
        }

        function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
            // confirm the Spy is called once for each element
            expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

            // check the first argument of Spy is right attendee for each call
            var allCalls = callbackSpy.calls.all();
            for (var i = 0; i < allCalls.length; i++) {
                expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
            }
        }

        beforeEach(function() {
            collection = Conference.attendeeCollection();
            callbackSpy = jasmine.createSpy();
        });

        it('빈 컬렉션에서는 콜백을 실행하지 않는다', function() {
            collection.iterate(callbackSpy);
            expect(callbackSpy).not.toHaveBeenCalled();
        });

        it('원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다.', function() {
            var attendees = [
                Conference.attendee('길동', '홍')
            ];
            addAttendeesToCollection(attendees);
            collection.iterate(callbackSpy);
            verifyCallbackWasExecutedForEachAttendee(attendees);
        });

        it('컬렉션 원소마다 한 번씩 콜백을 실행한다.', function() {
            var attendees = [
                Conference.attendee('유신', '김'),
                Conference.attendee('황', '이'),
                Conference.attendee('철수', '이')
            ];
            addAttendeesToCollection(attendees);
            collection.iterate(callbackSpy);

            verifyCallbackWasExecutedForEachAttendee(attendees);
        });
    });

    describe('Conference.checkInService', function() {
        var checkInService,
            checkInRecorder,
            attendee;
        beforeEach(function() {
            checkInRecorder = Conference.checkInRecorder();
            spyOn(checkInRecorder, 'recordCheckIn');

            // checkIRecorder를 주입하면서 
            // 이 함수의 recordCheckIn 함수에 스파이를 심는다.
            checkInService = Conference.checkInService(checkInRecorder);

            attendee = Conference.attendee('인자', '박');
        });

        describe('checkInService.checkIn(attendee)', function() {
            it('참가자를 체크인 처리한 것으로 표시한다.', function() {
                checkInService.checkIn(attendee);
                expect(attendee.isCheckedIn()).toBe(true);
            });
            it('체크인을 등록한다.', function() {
                checkInService.checkIn(attendee);
                expect(checkInRecorder.recordCheckIn).toHaveBeenCalled(attendee);
            });
        });
    });
});