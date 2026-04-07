<?php
/**
 * Template Name: Kho Phú Mỹ
 *
 * Maps: khophumy.html → WordPress Page Template
 * ACF Group: group_pm3_khophumy_page
 *
 * Sections:
 *  1. Breadcrumb
 *  2. Banner (banner_heading + banner_cards repeater)
 *  3. Điều hướng (nav_items repeater)
 *  4. Hạ tầng & Năng lực vận hành (infra_title + polygon_items repeater)
 *  5. Hệ thống Kho (warehouse_title + warehouse_items repeater + gallery)
 *  6. Dịch vụ (services_title + service_cards repeater)
 *
 * @package CanhCamTheme
 */

get_header();
?>

<main>

	<?php /* ─── 1. Breadcrumb ──────────────────────────────────────────── */ ?>
	<section class="global-breadcrumb">
		<div class="container">
			<?php
            if ( function_exists( 'rank_math_the_breadcrumbs' ) ) {
                rank_math_the_breadcrumbs();
            }
            ?>
		</div>
	</section>

	<?php /* ─── 2. Banner ──────────────────────────────────────────────── */ ?>
	<?php
    $banner_section_id = get_field( 'banner_section_id' );
    $banner_heading    = get_field( 'banner_heading' );
    $banner_cards      = get_field( 'banner_cards' );
    ?>
	<section class="section-cangcanphumy-banner"<?php if ( $banner_section_id ) echo ' id="' . esc_attr( $banner_section_id ) . '"'; ?>>
		<svg class="clip-defs" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<clipPath id="clip-card-left" clipPathUnits="objectBoundingBox" transform="scale(0.001471, 0.002381)">
					<path
						d="M40 2H530.129C541.481 2.00015 552.238 7.07568 559.456 15.8369L612.956 80.7715L669.328 149.192C674.934 155.997 678 164.539 678 173.355V380C678 400.987 660.987 418 640 418H40C19.0132 418 2 400.987 2 380V40C2 19.0132 19.0132 2 40 2Z">
					</path>
				</clipPath>
				<clipPath id="clip-card-right" clipPathUnits="objectBoundingBox" transform="scale(0.001471, 0.002381)">
					<path
						d="M40 2H640C660.987 2 678 19.0132 678 40V380C678 400.987 660.987 418 640 418H149.871C138.519 418 127.762 412.924 120.544 404.163L67.044 339.228L10.672 270.808C5.066 264.003 2 255.461 2 246.645V40C2 19.0132 19.0132 2 40 2Z">
					</path>
				</clipPath>
			</defs>
		</svg>

		<div class="banner-background img-cover">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/home-about-bg.jpg' ); ?>"
				alt="">
		</div>

		<div class="container-full">
			<div class="banner-inner">

				<?php if ( $banner_heading ) : ?>
				<h1 class="banner-heading" data-text="<?php echo esc_attr( $banner_heading ); ?>" data-aos="fade-down"
					data-aos-duration="900">
					<span><?php echo esc_html( $banner_heading ); ?></span>
				</h1>
				<?php endif; ?>

				<?php if ( $banner_cards ) : ?>
				<div class="banner-card-list">
					<?php foreach ( $banner_cards as $card ) :
                        $type      = $card['card_type'];
                        $card_img  = $card['card_image'];
                        $aos_dir   = $type === 'left' ? 'fade-right' : 'fade-left';
                        $aos_delay = $type === 'left' ? 200 : 350;
                    ?>
					<article class="banner-card is-<?php echo esc_attr( $type ); ?>"
						data-aos="<?php echo esc_attr( $aos_dir ); ?>"
						data-aos-delay="<?php echo esc_attr( $aos_delay ); ?>">

						<?php if ( $card_img ) : ?>
						<div class="card-image">
							<img src="<?php echo esc_url( $card_img['url'] ); ?>"
								alt="<?php echo esc_attr( $card_img['alt'] ); ?>">
						</div>
						<?php endif; ?>

						<?php if ( $type === 'left' ) : ?>
						<svg class="card-border" viewBox="0 0 680 420" preserveAspectRatio="none" aria-hidden="true">
							<path
								d="M40 2H530.129C541.481 2.00015 552.238 7.07568 559.456 15.8369L612.956 80.7715L669.328 149.192C674.934 155.997 678 164.539 678 173.355V380C678 400.987 660.987 418 640 418H40C19.0132 418 2 400.987 2 380V40C2 19.0132 19.0132 2 40 2Z"
								fill="none" stroke="white" stroke-width="4"></path>
						</svg>
						<?php else : ?>
						<svg class="card-border" viewBox="0 0 680 420" preserveAspectRatio="none" aria-hidden="true">
							<path
								d="M40 2H640C660.987 2 678 19.0132 678 40V380C678 400.987 660.987 418 640 418H149.871C138.519 418 127.762 412.924 120.544 404.163L67.044 339.228L10.672 270.808C5.066 264.003 2 255.461 2 246.645V40C2 19.0132 19.0132 2 40 2Z"
								fill="none" stroke="white" stroke-width="4"></path>
						</svg>
						<?php endif; ?>

						<?php if ( $card['card_title'] ) : ?>
						<div class="card-caption">
							<h2 class="card-title"><?php echo esc_html( $card['card_title'] ); ?></h2>
						</div>
						<?php endif; ?>

					</article>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>

			</div>
		</div>
	</section>

	<?php /* ─── 3. Điều hướng ─────────────────────────────────────────── */ ?>
	<?php
    $nav_section_id = get_field( 'nav_section_id' );
    $nav_items      = get_field( 'nav_items' );
    ?>
	<?php if ( $nav_items ) : ?>
	<section class="general-nav"<?php if ( $nav_section_id ) echo ' id="' . esc_attr( $nav_section_id ) . '"'; ?>>
		<div class="container">
			<ul class="nav-list">
				<?php foreach ( $nav_items as $i => $item ) : ?>
				<li class="nav-item<?php echo $i === 0 ? ' active' : ''; ?>">
					<a class="nav-link" href="<?php echo esc_attr( $item['nav_href'] ); ?>">
						<?php echo esc_html( $item['nav_label'] ); ?>
					</a>
				</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>
	<?php endif; ?>

	<?php /* ─── 4. Hạ tầng & Năng lực vận hành ──────────────────────── */ ?>
	<?php
    $infra_section_id = get_field( 'infra_section_id' );
    $infra_title      = get_field( 'infra_title' );
    $polygon_items    = get_field( 'polygon_items' );
    $infra_bg         = get_field( 'infra_background' );
    $infra_bg_url     = $infra_bg ? esc_url( $infra_bg['url'] ) : esc_url( get_template_directory_uri() . '/assets/images/background_hatang_nangluc.png' );
    ?>
	<section class="section-khophumy-infrastructure full-bleed lozad-bg"<?php if ( $infra_section_id ) echo ' id="' . esc_attr( $infra_section_id ) . '"'; ?>
		data-background-image="<?php echo $infra_bg_url; ?>">
		<div class="container">
			<div class="section-khophumy-infrastructure__inner">

				<?php if ( $infra_title ) : ?>
				<h2 class="section-khophumy-infrastructure__title" data-aos="fade-up">
					<?php echo esc_html( $infra_title ); ?>
				</h2>
				<?php endif; ?>

				<div class="bg-svg" data-aos="fade" data-aos-delay="100">
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/line_connect_polygon.svg' ); ?>"
						alt="Cơ sở vật chất">
				</div>

				<?php if ( $polygon_items ) : ?>
				<div class="section-khophumy-infrastructure__polygon-list">
					<?php foreach ( $polygon_items as $i => $polygon ) :
                        $icon  = $polygon['polygon_icon'];
                        $delay = ( $i + 1 ) * 150;
                    ?>
					<div class="section-khophumy-infrastructure__polygon-item" data-aos="fade"
						data-aos-delay="<?php echo esc_attr( $delay ); ?>">
						<div class="section-khophumy-infrastructure__polygon-wrap">

							<div class="bg-overlay lozad-bg"
								data-background-image="<?php echo esc_url( get_template_directory_uri() . '/assets/images/bg-polygon.png' ); ?>">
							</div>

							<?php if ( $icon ) : ?>
							<div class="section-khophumy-infrastructure__polygon-icon">
								<img src="<?php echo esc_url( $icon['url'] ); ?>"
									alt="<?php echo esc_attr( $polygon['polygon_title'] ); ?>">
							</div>
							<?php endif; ?>

							<?php if ( $polygon['polygon_title'] ) : ?>
							<h3 class="section-khophumy-infrastructure__polygon-title">
								<?php echo esc_html( $polygon['polygon_title'] ); ?>
							</h3>
							<?php endif; ?>

							<?php if ( $polygon['polygon_detail'] ) : ?>
							<div class="section-khophumy-infrastructure__polygon-detail">
								<?php echo wp_kses_post( $polygon['polygon_detail'] ); ?>
							</div>
							<?php endif; ?>

						</div>
					</div>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>

			</div>
		</div>
	</section>

	<?php /* ─── 5. Hệ thống Kho ─────────────────────────────────────── */ ?>
	<?php
    $warehouse_section_id = get_field( 'warehouse_section_id' );
    $warehouse_title      = get_field( 'warehouse_title' );
    $warehouse_items      = get_field( 'warehouse_items' );
    ?>
	<section class="section-khophumy-warehouse"<?php if ( $warehouse_section_id ) echo ' id="' . esc_attr( $warehouse_section_id ) . '"'; ?>>
		<div class="bg-kho">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/bg-kho.png' ); ?>"
				alt="Hệ thống kho tại Phú Mỹ">
		</div>
		<div class="container">
			<div class="section-header">
				<?php if ( $warehouse_title ) : ?>
				<h2 class="section-title" data-aos="fade-up"><?php echo esc_html( $warehouse_title ); ?></h2>
				<?php endif; ?>
			</div>

			<?php if ( $warehouse_items ) : ?>
			<div class="warehouse-layout">

				<!-- Tab list (trái) -->
				<div class="warehouse-tab-list" role="list" data-aos="fade-right" data-aos-delay="100">
					<?php foreach ( $warehouse_items as $i => $wh ) : ?>
					<div class="warehouse-tab-item<?php echo $i === 0 ? ' active' : ''; ?>"
						data-index="<?php echo esc_attr( $i ); ?>"
						data-target="#warehouse-gallery-<?php echo esc_attr( $i ); ?>">
						<button class="warehouse-tab-btn" type="button"
							aria-expanded="<?php echo $i === 0 ? 'true' : 'false'; ?>"
							aria-controls="warehouse-gallery-<?php echo esc_attr( $i ); ?>">
							<span class="tab-icon" aria-hidden="true">
								<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M31.3371 14.9613L1.62358 1.24733C1.15045 1.03248 0.585894 1.16047 0.25676 1.56732C0.0957054 1.76439 0.00546218 2.00982 0.00048901 2.26428C-0.00448416 2.51874 0.0761006 2.7675 0.229332 2.97071L10.0005 15.999L0.229332 29.0272C-0.0860891 29.4455 -0.0746608 30.0261 0.254474 30.4306C0.476183 30.7072 0.807603 30.8557 1.14359 30.8557C1.30588 30.8557 1.46816 30.8215 1.6213 30.7506L31.3349 17.0367C31.7417 16.8492 32 16.4447 32 15.999C32 15.5533 31.7417 15.1487 31.3371 14.9613Z"
										fill="currentColor" />
								</svg>
							</span>
							<?php if ( $wh['wh_title'] ) : ?>
							<span class="tab-title"><?php echo esc_html( $wh['wh_title'] ); ?></span>
							<?php endif; ?>
						</button>
						<?php if ( $wh['wh_desc'] ) : ?>
						<div class="warehouse-tab-desc">
							<?php echo wp_kses_post( $wh['wh_desc'] ); ?>
						</div>
						<?php endif; ?>
					</div>
					<?php endforeach; ?>
				</div>

				<!-- Gallery list (phải) -->
				<div class="warehouse-gallery-list" data-aos="fade-left" data-aos-delay="200">
					<?php foreach ( $warehouse_items as $i => $wh ) :
                        $gallery = $wh['wh_gallery'];
                    ?>
					<div class="warehouse-gallery<?php echo $i === 0 ? ' active' : ''; ?>"
						id="warehouse-gallery-<?php echo esc_attr( $i ); ?>"
						aria-hidden="<?php echo $i === 0 ? 'false' : 'true'; ?>">
						<div class="warehouse-slider">
							<div class="swiper">
								<div class="swiper-wrapper">
									<?php if ( $gallery ) :
                                        foreach ( $gallery as $slide ) :
                                            $slide_img = $slide['wh_gallery_image'];
                                    ?>
									<div class="swiper-slide">
										<?php if ( $slide_img ) : ?>
										<div class="slide-image img-cover">
											<img src="<?php echo esc_url( $slide_img['url'] ); ?>"
												alt="<?php echo esc_attr( $slide_img['alt'] ); ?>">
										</div>
										<?php endif; ?>
									</div>
									<?php
                                        endforeach;
                                    endif;
                                    ?>
								</div>
							</div>
						</div>
						<div class="warehouse-slider-controls">
							<button class="button-prev" type="button" aria-label="Xem ảnh trước">
								<i class="fa-light fa-chevron-left"></i>
							</button>
							<button class="button-next" type="button" aria-label="Xem ảnh tiếp theo">
								<i class="fa-light fa-chevron-right"></i>
							</button>
						</div>
					</div>
					<?php endforeach; ?>
				</div>

			</div>
			<?php endif; ?>
		</div>
	</section>

	<?php /* ─── 6. Dịch vụ ──────────────────────────────────────────── */ ?>
	<?php
    $services_section_id = get_field( 'services_section_id' );
    $services_title      = get_field( 'services_title' );
    $service_cards       = get_field( 'service_cards' );
    ?>
	<section class="section-khophumy-services"<?php if ( $services_section_id ) echo ' id="' . esc_attr( $services_section_id ) . '"'; ?>>
		<div class="section-header">
			<?php if ( $services_title ) : ?>
			<h2 class="section-title" data-aos="fade-up"><?php echo esc_html( $services_title ); ?></h2>
			<?php endif; ?>
		</div>

		<?php if ( $service_cards ) : ?>
		<div class="section-khophumy-services__swiper" data-aos="fade-up" data-aos-delay="150">
			<div class="swiper">
				<div class="swiper-wrapper">
					<?php foreach ( $service_cards as $card ) :
                        $card_img = $card['svc_image'];
                    ?>
					<div class="swiper-slide">
						<article class="service-card">
							<?php if ( $card_img ) : ?>
							<div class="service-card__image img-cover">
								<img src="<?php echo esc_url( $card_img['url'] ); ?>"
									alt="<?php echo esc_attr( $card['svc_title'] ); ?>" loading="lazy">
							</div>
							<?php endif; ?>
							<div class="service-card__overlay" aria-hidden="true"></div>
							<div class="service-card__body">
								<?php if ( $card['svc_title'] ) : ?>
								<h3 class="service-card__title"><?php echo esc_html( $card['svc_title'] ); ?></h3>
								<?php endif; ?>
							</div>
						</article>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
		<?php endif; ?>
	</section>

</main>

<?php
get_footer();
?>