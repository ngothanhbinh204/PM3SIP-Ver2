	<div class="backdrop backdrop-mobile"></div>
	<div class="backdrop backdrop-search"></div>
	<div class="cta-fixed">
		<?php
		$site_button_cta = get_field('site_button_cta', 'options');
		if ($site_button_cta) :
			echo $site_button_cta;
		endif;
		?>
	</div>
	</main>
	<?php
	$footer_bg_image       = get_field( 'footer_bg_image', 'options' );
	$footer_brand_title    = get_field( 'footer_brand_title', 'options' );
	$footer_brand_title_bg = get_field( 'footer_brand_title_bg', 'options' );
	$footer_address_blocks = get_field( 'footer_address_blocks', 'options' );
	$footer_menu_cols      = get_field( 'footer_menu_cols', 'options' );
	$site_social           = get_field( 'site_social', 'options' );
	$site_copyright        = get_field( 'site_copyright', 'options' );
	$site_logo             = get_field( 'site_logo', 'options' );
	?>
	<footer>
		<div class="footer-top"
			<?php if ( $footer_bg_image ) echo ' style="background-image: url(\'' . esc_url( $footer_bg_image['url'] ) . '\')"'; ?>>
			<?php if ( $footer_brand_title ) : ?>
			<div class="footer-brand-title">
				<span class="footer-brand-title__text"
					<?php if ( $footer_brand_title_bg ) echo ' style="background-image: url(\'' . esc_url( $footer_brand_title_bg['url'] ) . '\')"'; ?>>
					<?php echo esc_html( $footer_brand_title ); ?>
				</span>
			</div>
			<?php endif; ?>
			<div class="container">
				<div class="footer-grid">
					<div class="footer-grid__item">
						<?php if ( $site_logo ) echo $site_logo; ?>
						<?php if ( $site_social ) : ?>
						<div class="social-list mt-6">
							<ul>
								<?php foreach ( $site_social as $item ) : ?>
								<li>
									<a href="<?php echo esc_url( $item['url'] ); ?>" target="_blank"
										rel="noopener noreferrer" title="<?php echo esc_attr( $item['title'] ); ?>">
										<?php echo $item['icon']; ?>
									</a>
								</li>
								<?php endforeach; ?>
							</ul>
						</div>
						<?php endif; ?>
					</div>
					<?php if ( $footer_address_blocks ) : ?>
					<?php foreach ( array_chunk( $footer_address_blocks, 2 ) as $chunk ) : ?>
					<div class="footer-grid__item">
						<div class="footer-address-group">
							<?php foreach ( $chunk as $addr ) : ?>
							<div class="footer-address-block">
								<?php if ( $addr['address_title'] ) : ?>
								<h3 class="footer-address-block__title"><?php echo esc_html( $addr['address_title'] ); ?>
								</h3>
								<?php endif; ?>
								<div class="footer-address-block__content">
									<?php echo wp_kses_post( $addr['address_content'] ); ?>
								</div>
							</div>
							<?php endforeach; ?>
						</div>
					</div>
					<?php endforeach; ?>
					<?php endif; ?>
					<?php if ( $footer_menu_cols ) : ?>
					<?php foreach ( $footer_menu_cols as $col ) : ?>
					<div class="footer-grid__item">
						<?php if ( $col['menu_title'] ) : ?>
						<p class="footer-title"><?php echo esc_html( $col['menu_title'] ); ?></p>
						<?php endif; ?>
						<?php if ( $col['menu_content'] ) : ?>
						<div class="footer-menu">
							<?php echo wp_kses_post( $col['menu_content'] ); ?>
						</div>
						<?php endif; ?>
					</div>
					<?php endforeach; ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
		<div class="footer-bot">
			<?php if ( $site_copyright ) echo $site_copyright; ?>
		</div>
	</footer>
	<?php wp_footer() ?>
	<?php
	$site_js_body_after = get_field('site_js_body_after', 'options');
	if ($site_js_body_after) {
		echo $site_js_body_after;
	}
	?>
	</body>

	</html>