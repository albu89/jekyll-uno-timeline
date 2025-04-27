---
layout: null
sitemap:
  exclude: 'yes'
---
function toggleMobileMenu() {
  $('.navigation-wrapper').toggleClass('visible');
  $('.btn-mobile-menu__icon').toggleClass('hidden');
  $('.btn-mobile-close__icon').toggleClass('hidden');
}

$(document).ready(function () {
  $('a.panel-button').click(function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var isBlogLink = href === '{{ site.baseurl }}/blog';
    var isPublicationsLink = href === '{{ site.baseurl }}/publications';
    var isProjectsLink = href === '{{ site.baseurl }}/projects';
    var currentPath = window.location.pathname;

    // Handle navigation
    if (isBlogLink || isPublicationsLink || isProjectsLink) {
      window.location.href = href;
      return;
    }

    // Toggle panel for other links
    if ($('.content-wrapper').hasClass('showing')){
      $('.content-wrapper').removeClass('showing')
      $('.panel-cover').removeClass('panel-cover--collapsed')
      $('.panel-cover').css('max-width', '100%')
      $('.panel-cover').css('width', '100%')
      history.pushState("", document.title, window.location.pathname + window.location.search);
      return;
    }

    $('.panel-cover').addClass('panel-cover--collapsed');
    currentWidth = $('.panel-cover').width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
    } else {
      $('.panel-cover').css('max-width', '530px')
      $('.panel-cover').css('width', '40%')
    }
    $('.content-wrapper').addClass('showing');
  })

  // Check if we should collapse the panel based on current path
  var currentPath = window.location.pathname;
  if (currentPath.indexOf('/blog') === 0 || 
      currentPath.indexOf('/publications') === 0 ||
      currentPath.indexOf('/projects') === 0 ||
      (currentPath !== '{{ site.baseurl }}/' && 
       currentPath !== '{{ site.baseurl }}/index.html')) {
    $('.panel-cover').addClass('panel-cover--collapsed')
    $('.content-wrapper').addClass('showing')
  }

  $('.btn-mobile-menu').click(function () {
    if (!$('.navigation-wrapper').hasClass('animated bounceInDown')){
        $('.navigation-wrapper').addClass('animated bounceInDown');
    }
    toggleMobileMenu();
  })

  $('.navigation-wrapper .projects-button').click(function () {
    toggleMobileMenu();
  })
})
