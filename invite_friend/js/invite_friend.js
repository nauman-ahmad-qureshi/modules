(function ($) {

/**
 * Attach collapse behavior to the form block.
 */
Drupal.behaviors.InviteFriendsForm = {
  attach: function (context) {
    $('#block-invt-frd-form', context).once('invtfrnds', function () {
    var $block = $(this);
    $block.find('span.invt-frd-link')
        .append('<span id="invt-frd-form-toggle"><img src="/sites/all/modules/invite_friend/images/plus.png" /></span> ')
        .css('cursor', 'pointer')
    .click(function(){
     var iteration=$(this).data('iteration')||1
     switch ( iteration) {
      case 1:
       Drupal.InviteFriendsFormToggle($block, false);
       break;
      case 2:
       Drupal.InviteFriendsFormToggle($block, true);
       break;
      }
      iteration++;
      if (iteration>2) iteration=1
       $(this).data('iteration',iteration)
    });
      $block.find('form').hide();
      $block.show();
    });
	$("#block-invt-frd-form form textarea").on("keydown", function (e) {
      return e.which !== 32;
    })
  }
};

/**
 * Re-collapse the form after every successful form submission.
 */
Drupal.behaviors.InviteFriendsFormSubmit = {
  attach: function (context) {
    var $context = $(context);
    if (!$context.is('#invt-frnds-status-message')) {
      return;
    }
    // Collapse the form.
    $('#block-invt-frd-form .invt-frd-link').click();
    // Blend out and remove status message.
    window.setTimeout(function () {
      $context.fadeOut('slow', function () {
        $context.remove();
      });
    }, 3000);
  }
};

/**
 * Collapse or uncollapse the form block.
 */
Drupal.InviteFriendsFormToggle = function ($block, enable) {
  $block.find('form').slideToggle('medium');
  if (enable) {
    $('#invt-frd-form-toggle', $block).html('<img src="/sites/all/modules/invite_friend/images/plus.png" />');
  }
  else {
    $('#invt-frd-form-toggle', $block).html('<img src="/sites/all/modules/invite_friend/images/minus.png" />');
  }
};





})(jQuery);
