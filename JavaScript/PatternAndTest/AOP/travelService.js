// 캐싱 없음
const TravelService = (function(rawWebService) {
  let conferenceAirport = 'BOS';
  let maxArrival = new Date(2021, 12, 31);
  let minDeparture = new Date(2020, 1, 1);

  return {
    getSuggestedTicket: function(homeAirport) {
      return rawWebService.getCheapestRoundTrip(
        homeAirport, conferenceAirport, maxArrival, minDeparture);
    }
  };
})();

// 캐싱 있음
const TravelService = (function(rawWebService) {
  let conferenceAirport = 'BOS';
  let maxArrival = new Date(2021, 12, 31);
  let minDeparture = new Date(2020, 1, 1);

  const cache = {};

  return {
    getSuggestedTicket: function(homeAirport) {
      if (cache[homeAirport]) {
        return cache[homeAirport];
      }

      const ticket = rawWebService.getCheapestRoundTrip(
        homeAirport, conferenceAirport, maxArrival, minDeparture);

      cache[homeAirport] = ticket;

      return ticket;
    }
  };
})();
