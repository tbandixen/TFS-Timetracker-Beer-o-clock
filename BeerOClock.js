javascript: (function () {
    var total = 0, daysWorked = 0;

    var context = $('.month-selector-container-calendar-month');
    var workDays = $('.month-calendar-week-day', context).not('.not-current-month').not('.non-work-day').not('.filler').not('.month-calendar-weekend-day');

    workDays
        .each(function () {
            var hourElement = $(this).find('.day-hours');
            var hours = parseFloat(hourElement.text());
            if (!!hours) {
                daysWorked += 1;
            }
            total += hours || 0;
            /*$(this).find('.month-calendar-date').css('text-decoration', 'underline');*/
        });
    var shouldHours = daysWorked * 8.4;
    var endTime = new Date((new Date()).setTime((new Date()).getTime() + ((shouldHours - total) * 60 * 60 * 1000)));
    var infoContainer = $('.today', context).find('.month-calendar-info');
    var displayElement = infoContainer.find('.beer-o-clock');
    if (displayElement.length === 0) {
        displayElement = $('<div class="beer-o-clock"></div>');
        infoContainer.append(displayElement);
    }
    displayElement.text(formatDate(endTime));

    function formatDate(date) {
        return /*leadingZero(date.getDate()) + '.' + leadingZero(date.getMonth() + 1) + '. ' + */leadingZero(date.getHours()) + ':' + leadingZero(date.getMinutes());
    }
    function leadingZero(n) {
        return ('0' + n).slice(-2);
    }
})();
