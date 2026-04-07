<?php
/*
	Template name: Page - Contact
*/
?>

<?php get_header() ?>

<?php get_template_part( '/modules/common/breadcrumb' ) ?>

<?php
$contact_bg_svg      = get_field( 'contact_bg_svg' );
$contact_title_sub   = get_field( 'contact_title_sub' );
$contact_title       = get_field( 'contact_title' );
$contact_info_groups = get_field( 'contact_info_groups' );
$contact_form_bg     = get_field( 'contact_form_bg' );
$form_contact        = get_field( 'form_contact' );
?>

<section class="contact-section section-large relative">
	<?php if ( $contact_bg_svg ) : ?>
	<div class="bg-svg"><img src="<?php echo esc_url( $contact_bg_svg['url'] ); ?>"
			alt="<?php echo esc_attr( $contact_bg_svg['alt'] ); ?>"></div>
	<?php endif; ?>
	<div class="container">
		<div class="row -mt-10">
			<div class="col w-full mt-10 lg:w-5/12">
				<div class="block-content">
					<?php if ( $contact_title_sub || $contact_title ) : ?>
					<h1 class="site-title">
						<?php if ( $contact_title_sub ) : ?><span><?php echo esc_html( $contact_title_sub ); ?></span><?php endif; ?>
						<?php if ( $contact_title ) echo nl2br( esc_html( $contact_title ) ); ?>
					</h1>
					<?php endif; ?>
					<?php if ( $contact_info_groups ) : ?>
					<?php foreach ( $contact_info_groups as $group ) : ?>
					<div class="contact-info">
						<?php if ( $group['info_group_title'] ) : ?>
						<h4 class="contact-title"><?php echo esc_html( $group['info_group_title'] ); ?></h4>
						<?php endif; ?>
						<?php if ( $group['info_items'] ) : ?>
						<ul>
							<?php foreach ( $group['info_items'] as $item ) : ?>
							<li>
								<?php if ( $item['item_icon'] ) : ?><i
									class="icon <?php echo esc_attr( $item['item_icon'] ); ?>"></i><?php endif; ?>
								<div><?php echo wp_kses_post( $item['item_content'] ); ?></div>
							</li>
							<?php endforeach; ?>
						</ul>
						<?php endif; ?>
					</div>
					<?php endforeach; ?>
					<?php endif; ?>
				</div>
			</div>
			<div class="col w-full mt-10 lg:w-7/12">
				<?php if ( $form_contact ) : ?>
				<div class="contact-form rounded-6<?php if ( $contact_form_bg ) echo ' lozad-bg'; ?>"
					<?php if ( $contact_form_bg ) echo ' data-background-image="' . esc_url( $contact_form_bg['url'] ) . '"'; ?>>
					<?php echo do_shortcode( $form_contact ); ?>
				</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>

<?php get_footer() ?>