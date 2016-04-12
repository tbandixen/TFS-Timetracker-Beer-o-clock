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
                var deltaStyles = {
                    marginLeft: '3px',
                    float: 'left',
                    marginTop: '-1.34em'
                };
                appendToDay($(this), 'month-calendar-info-delta', '&Delta; ' + Math.round((-8.4 + hours) * 100) / 100, deltaStyles);
                appendToDay($(this), 'month-calendar-info', '&nbsp;');
                total += hours;
            }
        });
    var shouldHours = daysWorked * 8.4;
    var endTime = new Date((new Date()).setTime((new Date()).getTime() + ((shouldHours - total) * 60 * 60 * 1000)));

    appendToDay($('.today', context), 'month-calendar-info', formatDate(endTime));

    function appendToDay(container, className, text, cssStyles) {
        var infoContainer = getOrCreateDivByClassName(container, className);
        var displayElement = getOrCreateDivByClassName(infoContainer, 'beer-o-clock');
        if (!!cssStyles) {
            displayElement.css(cssStyles);
        }
        displayElement.html(text);
    }
    function getOrCreateDivByClassName(container, className) {
        var displayElement = container.find('.' + className);
        if (displayElement.length === 0) {
            displayElement = $('<div class="' + className + '"></div>');
            container.append(displayElement);
        }
        return displayElement;
    }
    function formatDate(date) {
        return leadingZero(date.getHours()) + ':' + leadingZero(date.getMinutes());
    }
    function leadingZero(n) {
        return ('0' + n).slice(-2);
    }
})();
