<?php
/**
 * Template Name: General — Tổng quan
 *
 * Maps: src/components/general/general.html → WordPress Page Template
 * ACF Group: group_pm3_general_page
 *
 * Sections:
 *  1. Breadcrumb
 *  2. Banner (banner_slides repeater)
 *  3. Điều hướng (nav_items repeater)
 *  4. Tin tức nhanh (news_posts relationship)
 *  5. Giới thiệu + thống kê (intro_* + intro_stats repeater)
 *  6. Hạ tầng (infra_title + infra_items repeater)
 *  7. Tầm nhìn – Sứ mệnh (vision/mission fields + hex_items repeater)
 *  8. Giá trị cốt lõi (cv_title + core_values repeater)
 *  9. Vị trí chiến lược (location_* + location_tabs repeater)
 * 10. Dịch vụ (services_title + service_cards repeater)
 * 11. Chứng chỉ (certs_title + certificates repeater)
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
    $banner_slides     = get_field( 'banner_slides' );
    ?>
	<?php if ( $banner_slides ) : ?>
	<section class="general-banner"
		<?php if ( $banner_section_id ) echo ' id="' . esc_attr( $banner_section_id ) . '"'; ?>>
		<div class="swiper banner-top">
			<div class="swiper-wrapper">
				<?php foreach ( $banner_slides as $slide ) :
                    $img = $slide['banner_image'];
                ?>
				<div class="swiper-slide">
					<?php if ( $slide['banner_title'] ) : ?>
					<h1 class="main-title-banner"><?php echo esc_html( $slide['banner_title'] ); ?></h1>
					<?php endif; ?>
					<?php if ( $img ) : ?>
					<div class="image img-cover">
						<img class="lozad" data-src="<?php echo esc_url( $img['url'] ); ?>" loading="lazy"
							alt="<?php echo esc_attr( $img['alt'] ); ?>">
					</div>
					<?php endif; ?>
					<div class="banner-title">
						<?php if ( $slide['banner_sub_title'] ) : ?>
						<h2 class="top-banner-title"><?php echo esc_html( $slide['banner_sub_title'] ); ?></h2>
						<?php endif; ?>
						<?php if ( $slide['banner_description'] ) : ?>
						<h3 class="bottom-banner-title"><?php echo esc_html( $slide['banner_description'] ); ?></h3>
						<?php endif; ?>
					</div>
				</div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="caption">
			<div class="swiper-relative mt-6">
				<div class="swiper banner-thumbs">
					<div class="swiper-wrapper">
						<?php foreach ( $banner_slides as $slide ) :
                            $thumb = $slide['banner_thumb'];
                        ?>
						<div class="swiper-slide">
							<?php if ( $thumb ) : ?>
							<div class="image img-cover">
								<img class="lozad" data-src="<?php echo esc_url( $thumb['url'] ); ?>" loading="lazy"
									alt="<?php echo esc_attr( $thumb['alt'] ); ?>">
							</div>
							<?php endif; ?>
						</div>
						<?php endforeach; ?>
					</div>
				</div>
				<div class="swiper-button">
					<div class="button-prev"><i class="fa-thin fa-chevron-left"></i></div>
					<div class="button-next"><i class="fa-thin fa-chevron-right"></i></div>
				</div>
			</div>
		</div>
	</section>
	<?php endif; ?>

	<?php /* ─── 3. Điều hướng ─────────────────────────────────────────── */ ?>
	<?php $nav_items = get_field( 'nav_items' ); ?>
	<?php if ( $nav_items ) : ?>
	<section class="general-nav full-bleed">
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

	<?php /* ─── 4. Tin tức nhanh ──────────────────────────────────────── */ ?>
	<?php
    $newsfeed_section_id = get_field( 'newsfeed_section_id' );
    $news_posts          = get_field( 'news_posts' );
    ?>
	<?php if ( $news_posts ) : ?>
	<section class="home-news-feed"
		<?php if ( $newsfeed_section_id ) echo ' id="' . esc_attr( $newsfeed_section_id ) . '"'; ?>>
		<div class="marquee" id="news-feed">
			<?php foreach ( $news_posts as $news_post ) : ?>
			<a href="<?php echo esc_url( get_permalink( $news_post->ID ) ); ?>">
				<span><?php echo esc_html( $news_post->post_title ); ?></span>
			</a>
			<?php endforeach; ?>
		</div>
	</section>
	<?php endif; ?>

	<?php /* ─── 5. Giới thiệu ──────────────────────────────────────────── */ ?>
	<?php
    $intro_section_id = get_field( 'intro_section_id' );
    $intro_bg_image   = get_field( 'intro_bg_image' );
    $intro_subtitle   = get_field( 'intro_subtitle' );
    $intro_title      = get_field( 'intro_title' );
    $intro_desc       = get_field( 'intro_desc' );
    $intro_stats      = get_field( 'intro_stats' );
    $intro_bg_url     = $intro_bg_image ? esc_url( $intro_bg_image['url'] ) : esc_url( get_template_directory_uri() . '/assets/images/bg-ss2.png' );
    ?>
	<section class="general-intro section-large full-bleed"
		<?php if ( $intro_section_id ) echo ' id="' . esc_attr( $intro_section_id ) . '"'; ?>>
		<div class="bg-intro" style="background-image: url('<?php echo $intro_bg_url; ?>')">
		</div>
		<div class="container">
			<div class="intro-header">
				<?php if ( $intro_subtitle ) : ?>
				<div class="sub-title" data-aos="fade-up"><?php echo esc_html( $intro_subtitle ); ?></div>
				<?php endif; ?>
				<?php if ( $intro_title ) : ?>
				<h2 class="site-title is-white" data-aos="fade-up" data-aos-delay="100">
					<?php echo esc_html( $intro_title ); ?></h2>
				<?php endif; ?>
				<?php if ( $intro_desc ) : ?>
				<div class="desc" data-aos="fade-up" data-aos-delay="200">
					<?php echo wp_kses_post( $intro_desc ); ?>
				</div>
				<?php endif; ?>
			</div>

			<?php if ( $intro_stats ) : ?>
			<div class="intro-stats">
				<?php foreach ( $intro_stats as $i => $stat ) :
                    $icon  = $stat['stat_icon'];
                    $delay = $i * 100;
                ?>
				<div class="home-about-item" data-aos="fade-up" data-aos-delay="<?php echo esc_attr( $delay ); ?>">
					<?php if ( $icon ) : ?>
					<div class="icon img-contain">
						<img src="<?php echo esc_url( $icon['url'] ); ?>" alt="<?php echo esc_attr( $icon['alt'] ); ?>">
					</div>
					<?php endif; ?>
					<div class="number">
						<span class="count-up" data-count="<?php echo esc_attr( $stat['stat_number'] ); ?>">0</span>
						<?php if ( $stat['stat_unit'] ) : ?>
						<span><?php echo esc_html( $stat['stat_unit'] ); ?></span>
						<?php endif; ?>
					</div>
					<?php if ( $stat['stat_title'] ) : ?>
					<h3 class="title"><?php echo esc_html( $stat['stat_title'] ); ?></h3>
					<?php endif; ?>
				</div>
				<?php endforeach; ?>
			</div>
			<?php endif; ?>
		</div>
	</section>

	<?php /* ─── 6. Hạ tầng ─────────────────────────────────────────────── */ ?>
	<?php
    $infra_section_id = get_field( 'infra_section_id' );
    $infra_title      = get_field( 'infra_title' );
    $infra_items      = get_field( 'infra_items' );
    ?>
	<section class="general-infrastructure section-large full-bleed"
		<?php if ( $infra_section_id ) echo ' id="' . esc_attr( $infra_section_id ) . '"'; ?>>
		<div class="container">
			<?php if ( $infra_title ) : ?>
			<h2 class="site-title" data-aos="fade-up"><?php echo esc_html( $infra_title ); ?></h2>
			<?php endif; ?>
		</div>

		<?php if ( $infra_items ) : ?>
		<div class="infrastructure-list">
			<!-- Desktop view -->
			<div class="desktop-view">
				<div class="bg-image-list">
					<?php foreach ( $infra_items as $i => $item ) :
                        $img = $item['infra_item_image'];
                    ?>
					<div class="bg-item<?php echo $i === 0 ? ' active' : ''; ?>">
						<?php if ( $img ) : ?>
						<img class="lozad" data-src="<?php echo esc_url( $img['url'] ); ?>" loading="lazy"
							alt="<?php echo esc_attr( $img['alt'] ); ?>">
						<?php endif; ?>
					</div>
					<?php endforeach; ?>
				</div>
				<div class="items-wrapper relative z-10 flex w-full h-full">
					<?php foreach ( $infra_items as $item ) : ?>
					<div class="infrastructure-item">
						<div class="text-content">
							<?php if ( $item['infra_item_title'] ) : ?>
							<h3 class="title"><?php echo esc_html( $item['infra_item_title'] ); ?></h3>
							<?php endif; ?>
							<?php if ( $item['infra_item_content'] ) : ?>
							<div class="content-wrap">
								<?php echo wp_kses_post( $item['infra_item_content'] ); ?>
							</div>
							<?php endif; ?>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
			</div>

			<!-- Mobile view -->
			<div class="mobile-view">
				<div class="one-slider infrastructure-mobile-slider">
					<div class="swiper">
						<div class="swiper-wrapper">
							<?php foreach ( $infra_items as $item ) :
                                $img = $item['infra_item_image'];
                            ?>
							<div class="swiper-slide">
								<div class="mobile-infra-item">
									<?php if ( $img ) : ?>
									<div class="bg-image">
										<img class="lozad" data-src="<?php echo esc_url( $img['url'] ); ?>"
											loading="lazy" alt="<?php echo esc_attr( $img['alt'] ); ?>">
									</div>
									<?php endif; ?>
									<div class="text-content">
										<?php if ( $item['infra_item_title'] ) : ?>
										<h3 class="title"><?php echo esc_html( $item['infra_item_title'] ); ?></h3>
										<?php endif; ?>
										<?php if ( $item['infra_item_content'] ) : ?>
										<div class="content-wrap">
											<?php echo wp_kses_post( $item['infra_item_content'] ); ?>
										</div>
										<?php endif; ?>
									</div>
								</div>
							</div>
							<?php endforeach; ?>
						</div>
					</div>
					<div class="swiper-pagination mt-4"></div>
				</div>
			</div>
		</div>
		<?php endif; ?>
	</section>

	<?php /* ─── 7. Tầm nhìn – Sứ mệnh ──────────────────────────────────── */ ?>
	<?php
    $vision_section_id = get_field( 'vision_section_id' );
    $vision_title      = get_field( 'vision_title' );
    $vision_desc       = get_field( 'vision_desc' );
    $mission_title     = get_field( 'mission_title' );
    $mission_desc      = get_field( 'mission_desc' );
    $hex_items         = get_field( 'hex_items' );
    $hex_classes       = [ 'hex-center', 'hex-1', 'hex-2', 'hex-3', 'hex-4', 'hex-5', 'hex-6' ];
    $assets_uri        = esc_url( get_template_directory_uri() . '/assets/images' );
    ?>
	<section class="general-vision-mission section-large full-bleed"
		<?php if ( $vision_section_id ) echo ' id="' . esc_attr( $vision_section_id ) . '"'; ?>>
		<div class="bg-gradient">
			<img src="<?php echo $assets_uri; ?>/bg-gradient-vision-mission.svg" alt="">
		</div>
		<div class="bg-map">
			<img src="<?php echo $assets_uri; ?>/map_bg.svg" alt="">
		</div>
		<div class="container">
			<div class="vision-mission-wrap">

				<!-- Tầm nhìn -->
				<div class="col-vision">
					<?php if ( $vision_title ) : ?>
					<h2 class="site-title is-white"><?php echo esc_html( $vision_title ); ?></h2>
					<?php endif; ?>
					<?php if ( $vision_desc ) : ?>
					<div class="desc"><?php echo wp_kses_post( $vision_desc ); ?></div>
					<?php endif; ?>
				</div>

				<!-- Honeycomb -->
				<div class="col-hexagon">
					<div class="arrow-svg arrow-left">
						<img src="<?php echo $assets_uri; ?>/arrow_vsms_left.svg" alt="">
					</div>
					<div class="arrow-svg arrow-right">
						<img src="<?php echo $assets_uri; ?>/arrow_vsms_right.svg" alt="">
					</div>
					<div class="honeycomb-cluster">
						<?php if ( $hex_items ) :
                            foreach ( $hex_items as $i => $hex ) :
                                $hex_class = isset( $hex_classes[ $i ] ) ? $hex_classes[ $i ] : 'hex-' . $i;
                                $delay     = $i * 100;
                                $icon      = $hex['hex_icon'];
                        ?>
						<div class="hex-wrap <?php echo esc_attr( $hex_class ); ?>" data-aos="zoom-in"
							data-aos-duration="800" data-aos-delay="<?php echo esc_attr( $delay ); ?>">
							<div class="hex-item">
								<div class="hex-bg">
									<img src="<?php echo $assets_uri; ?>/box_honeycomb.svg" alt="">
								</div>
								<?php if ( $icon ) : ?>
								<div class="hex-icon">
									<img src="<?php echo esc_url( $icon['url'] ); ?>"
										alt="<?php echo esc_attr( $icon['alt'] ); ?>">
								</div>
								<?php endif; ?>
							</div>
						</div>
						<?php
                            endforeach;
                        endif;
                        ?>
					</div>
				</div>

				<!-- Sứ mệnh -->
				<div class="col-mission">
					<?php if ( $mission_title ) : ?>
					<h2 class="site-title is-white"><?php echo esc_html( $mission_title ); ?></h2>
					<?php endif; ?>
					<?php if ( $mission_desc ) : ?>
					<div class="desc"><?php echo wp_kses_post( $mission_desc ); ?></div>
					<?php endif; ?>
				</div>

			</div>
		</div>
	</section>

	<?php /* ─── 8. Giá trị cốt lõi ────────────────────────────────────── */ ?>
	<?php
    $cv_section_id = get_field( 'cv_section_id' );
    $cv_title      = get_field( 'cv_title' );
    $core_values   = get_field( 'core_values' );
    ?>
	<section class="section-core-values"
		<?php if ( $cv_section_id ) echo ' id="' . esc_attr( $cv_section_id ) . '"'; ?>>
		<div class="wrapper-core-values">
			<div class="core-values-header">
				<?php if ( $cv_title ) : ?>
				<h2 data-aos="fade-up"><?php echo esc_html( $cv_title ); ?></h2>
				<?php endif; ?>
			</div>

			<div class="core-values-body">
				<div class="core-values-image" data-aos="zoom-in" data-aos-duration="1000">
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/core_values_image.svg' ); ?>"
						alt="">
				</div>

				<?php if ( $core_values ) : ?>
				<!-- Desktop list -->
				<div class="core-values-list">
					<?php foreach ( $core_values as $i => $cv ) :
                        $item_class = 'item-' . ( $i + 1 );
                        $delay      = $i * 80;
                    ?>
					<div class="core-values-item <?php echo esc_attr( $item_class ); ?>" data-aos="fade-left"
						data-aos-delay="<?php echo esc_attr( $delay ); ?>">
						<?php if ( $cv['cv_item_title'] ) : ?>
						<h3><?php echo esc_html( $cv['cv_item_title'] ); ?></h3>
						<?php endif; ?>
						<?php if ( $cv['cv_item_subtitle'] ) : ?>
						<p class="subtitle"><?php echo esc_html( $cv['cv_item_subtitle'] ); ?></p>
						<?php endif; ?>
						<?php if ( $cv['cv_item_desc'] ) : ?>
						<p class="desc"><?php echo wp_kses_post( $cv['cv_item_desc'] ); ?></p>
						<?php endif; ?>
					</div>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>
			</div>

			<?php if ( $core_values ) : ?>
			<!-- Mobile slider -->
			<div class="core-values-mobile">
				<div class="one-slider no-autoplay core-values-mobile-slider" data-aos="fade-up">
					<div class="swiper">
						<div class="swiper-wrapper">
							<?php foreach ( $core_values as $cv ) :
                                $icon = $cv['cv_icon'];
                            ?>
							<div class="swiper-slide">
								<div class="core-values-item">
									<?php if ( $icon ) : ?>
									<div class="icon">
										<img src="<?php echo esc_url( $icon['url'] ); ?>"
											alt="<?php echo esc_attr( $icon['alt'] ); ?>">
									</div>
									<?php endif; ?>
									<div class="text-content">
										<?php if ( $cv['cv_item_title'] ) : ?>
										<h3 class="title"><?php echo esc_html( $cv['cv_item_title'] ); ?></h3>
										<?php endif; ?>
										<?php if ( $cv['cv_item_subtitle'] ) : ?>
										<p class="subtitle"><?php echo esc_html( $cv['cv_item_subtitle'] ); ?></p>
										<?php endif; ?>
										<?php if ( $cv['cv_item_desc'] ) : ?>
										<p class="desc"><?php echo wp_kses_post( $cv['cv_item_desc'] ); ?></p>
										<?php endif; ?>
									</div>
								</div>
							</div>
							<?php endforeach; ?>
						</div>
					</div>
					<div class="swiper-pagination mt-6"></div>
				</div>
			</div>
			<?php endif; ?>
		</div>
	</section>

	<?php /* ─── 9. Vị trí chiến lược ──────────────────────────────────── */ ?>
	<?php
    $location_section_id = get_field( 'location_section_id' );
    $location_title      = get_field( 'location_title' );
    $location_desc       = get_field( 'location_desc' );
    $location_subtitle   = get_field( 'location_subtitle' );
    $location_tabs       = get_field( 'location_tabs' );
    ?>
	<section class="general-location section-large"
		<?php if ( $location_section_id ) echo ' id="' . esc_attr( $location_section_id ) . '"'; ?>>
		<div class="container">
			<div class="location-header">
				<?php if ( $location_title ) : ?>
				<h2 class="site-title" data-aos="fade-up"><?php echo esc_html( $location_title ); ?></h2>
				<?php endif; ?>
				<?php if ( $location_desc ) : ?>
				<div class="desc" data-aos="fade-up" data-aos-delay="100">
					<?php echo wp_kses_post( $location_desc ); ?>
				</div>
				<?php endif; ?>
				<?php if ( $location_subtitle ) : ?>
				<div class="sub-title" data-aos="fade-up" data-aos-delay="200">
					<?php echo esc_html( $location_subtitle ); ?>
				</div>
				<?php endif; ?>
				<?php if ( $location_tabs ) : ?>
				<div class="tabs-container">
					<?php foreach ( $location_tabs as $i => $tab ) : ?>
					<div class="btn <?php echo $i === 0 ? 'btn-primary active' : 'btn-light'; ?>"
						data-target="#location-tab-<?php echo esc_attr( $i + 1 ); ?>">
						<span><?php echo esc_html( $tab['ltab_label'] ); ?></span>
					</div>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>
			</div>
		</div>

		<?php if ( $location_tabs ) : ?>
		<div class="map-wrapper">
			<?php foreach ( $location_tabs as $i => $tab ) :
                $map = $tab['ltab_map'];
            ?>
			<div class="map-pane bg-map<?php echo $i === 0 ? ' active' : ''; ?>"
				id="location-tab-<?php echo esc_attr( $i + 1 ); ?>">
				<?php if ( $map ) : ?>
				<div class="image">
					<img class="w-full h-full object-cover" src="<?php echo esc_url( $map['url'] ); ?>"
						alt="<?php echo esc_attr( $map['alt'] ); ?>">
				</div>
				<?php endif; ?>
				<?php if ( $tab['ltab_info_title'] || $tab['ltab_info_content'] ) : ?>
				<div class="map-info-box">
					<?php if ( $tab['ltab_info_title'] ) : ?>
					<h3 class="info-title"><?php echo esc_html( $tab['ltab_info_title'] ); ?></h3>
					<?php endif; ?>
					<?php if ( $tab['ltab_info_content'] ) : ?>
					<div class="info-list"><?php echo wp_kses_post( $tab['ltab_info_content'] ); ?></div>
					<?php endif; ?>
				</div>
				<?php endif; ?>
				<?php if ( $tab['ltab_legend_title'] || $tab['ltab_legend_content'] ) : ?>
				<div class="map-legend-box">
					<?php if ( $tab['ltab_legend_title'] ) : ?>
					<h4 class="legend-title"><?php echo esc_html( $tab['ltab_legend_title'] ); ?></h4>
					<?php endif; ?>
					<?php if ( $tab['ltab_legend_content'] ) : ?>
					<div class="legend-list"><?php echo wp_kses_post( $tab['ltab_legend_content'] ); ?></div>
					<?php endif; ?>
				</div>
				<?php endif; ?>
			</div>
			<?php endforeach; ?>

			<div class="map-controls">
				<div class="nav-arrows">
					<div class="control-btn btn-up"><i class="fa-regular fa-chevron-up"></i></div>
					<div class="control-btn btn-left"><i class="fa-regular fa-chevron-left"></i></div>
					<div class="control-btn btn-right"><i class="fa-regular fa-chevron-right"></i></div>
					<div class="control-btn btn-down"><i class="fa-regular fa-chevron-down"></i></div>
				</div>
				<div class="zoom-controls">
					<div class="control-btn btn-plus"><i class="fa-regular fa-plus"></i></div>
					<div class="control-btn btn-minus"><i class="fa-regular fa-minus"></i></div>
					<div class="control-btn btn-fullscreen"><i class="fa-regular fa-expand"></i></div>
				</div>
			</div>
		</div>
		<?php endif; ?>
	</section>

	<?php /* ─── 10. Dịch vụ ─────────────────────────────────────────────── */ ?>
	<?php
    $services_section_id = get_field( 'services_section_id' );
    $services_title      = get_field( 'services_title' );
    $service_cards       = get_field( 'service_cards' );
    ?>
	<section class="general-services section-large"
		<?php if ( $services_section_id ) echo ' id="' . esc_attr( $services_section_id ) . '"'; ?>>
		<div class="container">
			<?php if ( $services_title ) : ?>
			<h2 class="site-title" data-aos="fade-up"><?php echo esc_html( $services_title ); ?></h2>
			<?php endif; ?>
			<?php if ( $service_cards ) : ?>
			<div class="services-grid">
				<?php foreach ( $service_cards as $i => $card ) :
                    $img   = $card['svc_image'];
                    $link  = $card['svc_link'];
                    $delay = $i * 100;
                ?>
				<div class="service-card" data-aos="fade-up" data-aos-delay="<?php echo esc_attr( $delay ); ?>">
					<?php if ( $img ) : ?>
					<div class="image">
						<img class="lozad" data-src="<?php echo esc_url( $img['url'] ); ?>" loading="lazy"
							alt="<?php echo esc_attr( $img['alt'] ); ?>">
					</div>
					<?php endif; ?>
					<div class="overlay"></div>
					<div class="caption">
						<?php if ( $card['svc_title'] ) : ?>
						<h3 class="title"><?php echo esc_html( $card['svc_title'] ); ?></h3>
						<?php endif; ?>
						<div class="line"></div>
						<?php if ( $card['svc_desc'] ) : ?>
						<div class="desc"><?php echo wp_kses_post( $card['svc_desc'] ); ?></div>
						<?php endif; ?>
					</div>
					<?php if ( $link ) : ?>
					<div class="bottom">
						<a href="<?php echo esc_url( $link['url'] ); ?>"
							<?php echo ! empty( $link['target'] ) ? 'target="' . esc_attr( $link['target'] ) . '"' : ''; ?>>
							<span><?php echo esc_html( $link['title'] ?: 'Tìm hiểu thêm' ); ?></span>
						</a>
					</div>
					<?php endif; ?>
				</div>
				<?php endforeach; ?>
			</div>
			<?php endif; ?>
		</div>
	</section>

	<?php /* ─── 11. Chứng chỉ ──────────────────────────────────────────── */ ?>
	<?php
    $certs_section_id = get_field( 'certs_section_id' );
    $certs_title      = get_field( 'certs_title' );
    $certificates     = get_field( 'certificates' );
    ?>
	<section class="general-certificates section-large full-bleed"
		<?php if ( $certs_section_id ) echo ' id="' . esc_attr( $certs_section_id ) . '"'; ?>>
		<div class="container-full-bleed">
			<?php if ( $certs_title ) : ?>
			<h2 class="site-title" data-aos="fade-up"><?php echo esc_html( $certs_title ); ?></h2>
			<?php endif; ?>
			<?php if ( $certificates ) : ?>
			<div class="five-slider cert-slider-wrapper" data-aos="fade-up" data-aos-delay="100">
				<div class="swiper">
					<div class="swiper-wrapper">
						<?php foreach ( $certificates as $cert ) :
                            $img = $cert['cert_image'];
                        ?>
						<div class="swiper-slide">
							<div class="cert-item">
								<?php if ( $img ) : ?>
								<div class="image img-contain">
									<img class="lozad" data-src="<?php echo esc_url( $img['url'] ); ?>" loading="lazy"
										alt="<?php echo esc_attr( $img['alt'] ); ?>">
								</div>
								<?php endif; ?>
								<?php if ( $cert['cert_title'] ) : ?>
								<div class="title"><?php echo esc_html( $cert['cert_title'] ); ?></div>
								<?php endif; ?>
							</div>
						</div>
						<?php endforeach; ?>
					</div>
				</div>
				<div class="swiper-button">
					<div class="button-prev"><i class="fa-regular fa-chevron-left"></i></div>
					<div class="button-next"><i class="fa-regular fa-chevron-right"></i></div>
				</div>
			</div>
			<?php endif; ?>
		</div>
	</section>

</main>

<?php
get_footer();
?>