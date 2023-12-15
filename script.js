const sr = ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

sr.reveal('.hero-text',{delay:200, origin:'top'});
sr.reveal('.hero-img',{delay:450, origin:'top'});
sr.reveal('.scroll-down',{delay:500, origin:'bottom'});

/* JS FOR FAQ */

$('body').delegate('.c-faq', 'click', function(){
    $('.c-faq').removeClass('c-faq--active');
    $(this).addClass('c-faq--active');
});
