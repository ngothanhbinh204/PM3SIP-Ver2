<?php
/**
 * Template Name: Cảng Cạn Phú Mỹ
 *
 * Maps: cangcanphumy.html → WordPress Page Template
 * ACF Group: group_pm3_cangcanphumy_page
 *
 * Sections:
 *  1. Breadcrumb
 *  2. Banner (banner_heading + banner_cards repeater)
 *  3. Điều hướng (nav_items repeater)
 *  4. Feature Grid — Giới thiệu (feature_items repeater)
 *  5. Tài liệu (docs_title + documents repeater)
 *  6. Hạ tầng & Trang thiết bị (infra_title + infra_items repeater)
 *  7. Dịch vụ Cảng (services_title + service_items repeater + popup + gallery)
 *  8. Dịch vụ Bến Phao (mooring_* fields)
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
                    <path d="M40 2H530.129C541.481 2.00015 552.238 7.07568 559.456 15.8369L612.956 80.7715L669.328 149.192C674.934 155.997 678 164.539 678 173.355V380C678 400.987 660.987 418 640 418H40C19.0132 418 2 400.987 2 380V40C2 19.0132 19.0132 2 40 2Z"></path>
                </clipPath>
                <clipPath id="clip-card-right" clipPathUnits="objectBoundingBox" transform="scale(0.001471, 0.002381)">
                    <path d="M40 2H640C660.987 2 678 19.0132 678 40V380C678 400.987 660.987 418 640 418H149.871C138.519 418 127.762 412.924 120.544 404.163L67.044 339.228L10.672 270.808C5.066 264.003 2 255.461 2 246.645V40C2 19.0132 19.0132 2 40 2Z"></path>
                </clipPath>
            </defs>
        </svg>

        <div class="banner-background img-cover">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/home-about-bg.jpg' ); ?>" alt="">
        </div>

        <div class="container-full">
            <div class="banner-inner">

                <?php if ( $banner_heading ) : ?>
                <h1 class="banner-heading"
                    data-text="<?php echo esc_attr( $banner_heading ); ?>"
                    data-aos="fade-down"
                    data-aos-duration="900">
                    <span><?php echo esc_html( $banner_heading ); ?></span>
                </h1>
                <?php endif; ?>

                <?php if ( $banner_cards ) : ?>
                <div class="banner-card-list">
                    <?php foreach ( $banner_cards as $card ) :
                        $type      = $card['card_type']; // 'left' | 'right'
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
                            <path d="M40 2H530.129C541.481 2.00015 552.238 7.07568 559.456 15.8369L612.956 80.7715L669.328 149.192C674.934 155.997 678 164.539 678 173.355V380C678 400.987 660.987 418 640 418H40C19.0132 418 2 400.987 2 380V40C2 19.0132 19.0132 2 40 2Z" fill="none" stroke="white" stroke-width="4"></path>
                        </svg>
                        <?php else : ?>
                        <svg class="card-border" viewBox="0 0 680 420" preserveAspectRatio="none" aria-hidden="true">
                            <path d="M40 2H640C660.987 2 678 19.0132 678 40V380C678 400.987 660.987 418 640 418H149.871C138.519 418 127.762 412.924 120.544 404.163L67.044 339.228L10.672 270.808C5.066 264.003 2 255.461 2 246.645V40C2 19.0132 19.0132 2 40 2Z" fill="none" stroke="white" stroke-width="4"></path>
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

    <?php /* ─── 4. Feature Grid — Giới thiệu ──────────────────────────── */ ?>
    <?php
    $feature_section_id = get_field( 'feature_section_id' );
    $feature_items      = get_field( 'feature_items' );
    ?>
    <?php if ( $feature_items ) : ?>
    <section class="section-cangcanphumy-feature-grid"<?php if ( $feature_section_id ) echo ' id="' . esc_attr( $feature_section_id ) . '"'; ?>>
        <div class="container-full">
            <div class="feature-grid">
                <?php foreach ( $feature_items as $i => $item ) :
                    $type         = $item['item_type']; // 'image' | 'text'
                    $has_corner   = ! empty( $item['has_corner'] );
                    $corner_align = $item['corner_align'];
                    $card_classes = [ 'feature-card', "is-{$type}" ];
                    if ( $has_corner )   $card_classes[] = 'has-corner';
                    if ( $corner_align ) $card_classes[] = "corner-{$corner_align}";
                    $delay = ( $i % 3 ) * 120;
                ?>
                <article class="<?php echo esc_attr( implode( ' ', $card_classes ) ); ?>"
                         data-aos="fade-up"
                         data-aos-delay="<?php echo esc_attr( $delay ); ?>">

                    <?php if ( $type === 'image' ) :
                        $img = $item['item_image'];
                    ?>
                        <?php if ( $img ) : ?>
                        <div class="card-image img-cover">
                            <img src="<?php echo esc_url( $img['url'] ); ?>"
                                 alt="<?php echo esc_attr( $img['alt'] ); ?>">
                        </div>
                        <?php endif; ?>

                    <?php else : /* type === 'text' */ ?>

                        <?php if ( $has_corner ) : ?>
                        <div class="card-corner" aria-hidden="true">
                            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/svg-of-text-corner-bottom.svg' ); ?>" alt="">
                        </div>
                        <?php endif; ?>
                        <div class="card-content">
                            <?php if ( $item['item_title'] ) : ?>
                            <h2 class="card-title"><?php echo esc_html( $item['item_title'] ); ?></h2>
                            <?php endif; ?>
                            <?php if ( $item['item_desc'] ) : ?>
                            <div class="card-desc">
                                <?php echo wp_kses_post( $item['item_desc'] ); ?>
                            </div>
                            <?php endif; ?>
                        </div>

                    <?php endif; ?>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <?php /* ─── 5. Tài liệu ──────────────────────────────────────────── */ ?>
    <?php
    $docs_section_id = get_field( 'docs_section_id' );
    $docs_title      = get_field( 'docs_title' );
    $documents       = get_field( 'documents' );
    ?>
    <section class="section-cangcanphumy-documents"<?php if ( $docs_section_id ) echo ' id="' . esc_attr( $docs_section_id ) . '"'; ?>>
        <div class="background-layer img-cover">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/document-background.png' ); ?>" alt="Document background">
        </div>
        <div class="container">
            <div class="section-header">
                <?php if ( $docs_title ) : ?>
                <h2 class="section-title" data-aos="fade-up"><?php echo esc_html( $docs_title ); ?></h2>
                <?php endif; ?>
            </div>
            <?php if ( $documents ) : ?>
            <div class="document-list">
                <?php foreach ( $documents as $i => $doc ) :
                    $file  = $doc['doc_file'];
                    $delay = $i * 150;
                ?>
                <a class="document-card"
                   href="<?php echo $file ? esc_url( $file['url'] ) : '#'; ?>"
                   download
                   data-aos="fade-up"
                   data-aos-delay="<?php echo esc_attr( $delay ); ?>">
                    <div class="card-action" aria-label="Download file">
                        <i class="fa-light fa-download"></i>
                    </div>
                    <div class="card-icon">
                        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/pdf-icon.svg' ); ?>" alt="PDF file">
                    </div>
                    <?php if ( $doc['doc_title'] ) : ?>
                    <div class="card-name"><?php echo esc_html( $doc['doc_title'] ); ?></div>
                    <?php endif; ?>
                </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </section>

    <?php /* ─── 6. Hạ tầng & Trang thiết bị ─────────────────────────── */ ?>
    <?php
    $infra_section_id = get_field( 'infra_section_id' );
    $infra_bg_image   = get_field( 'infra_bg_image' );
    $infra_title      = get_field( 'infra_title' );
    $infra_items      = get_field( 'infra_items' );
    $infra_bg_url     = $infra_bg_image ? esc_url( $infra_bg_image['url'] ) : esc_url( get_template_directory_uri() . '/assets/images/bg-cosohatang.png' );
    ?>
    <section class="section-cangcanphumy-infrastructure"<?php if ( $infra_section_id ) echo ' id="' . esc_attr( $infra_section_id ) . '"'; ?>>
        <div class="background-layer img-cover">
            <img src="<?php echo $infra_bg_url; ?>" alt="Co so ha tang va trang thiet bi">
        </div>
        <div class="curve-top" aria-hidden="true"></div>
        <div class="curve-bottom" aria-hidden="true"></div>
        <div class="container">
            <div class="section-header">
                <?php if ( $infra_title ) : ?>
                <h2 class="section-title" data-aos="fade-up"><?php echo esc_html( $infra_title ); ?></h2>
                <?php endif; ?>
            </div>
            <?php if ( $infra_items ) : ?>
            <div class="infrastructure-panel">
                <?php foreach ( $infra_items as $i => $item ) :
                    $icon  = $item['item_icon'];
                    $delay = $i * 150;
                ?>
                <div class="infrastructure-item"
                     data-aos="fade-up"
                     data-aos-delay="<?php echo esc_attr( $delay ); ?>">
                    <?php if ( $icon ) : ?>
                    <div class="item-icon">
                        <img src="<?php echo esc_url( $icon['url'] ); ?>"
                             alt="<?php echo esc_attr( $item['item_title'] ); ?>">
                    </div>
                    <?php endif; ?>
                    <div class="item-content">
                        <?php if ( $item['item_title'] ) : ?>
                        <h3 class="item-title"><?php echo esc_html( $item['item_title'] ); ?></h3>
                        <?php endif; ?>
                        <?php if ( $item['item_desc'] ) : ?>
                        <div class="item-desc">
                            <?php echo wp_kses_post( $item['item_desc'] ); ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </section>

    <?php /* ─── 7. Dịch vụ Cảng ─────────────────────────────────────── */ ?>
    <?php
    $services_section_id = get_field( 'services_section_id' );
    $services_title      = get_field( 'services_title' );
    $service_items       = get_field( 'service_items' );
    ?>
    <section class="section-cangcanphumy-services"<?php if ( $services_section_id ) echo ' id="' . esc_attr( $services_section_id ) . '"'; ?>>
        <div class="background-layer" aria-hidden="true">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/dich_vu_cang.svg' ); ?>" alt="">
        </div>
        <div class="container">
            <div class="section-header">
                <?php if ( $services_title ) : ?>
                <h2 class="section-title" data-aos="fade-up"><?php echo esc_html( $services_title ); ?></h2>
                <?php endif; ?>
            </div>

            <?php if ( $service_items ) : ?>
            <div class="service-layout">

                <!-- Tab list (left sidebar) -->
                <div class="service-tab-list"
                     role="tablist"
                     aria-label="<?php echo esc_attr( $services_title ); ?>"
                     data-aos="fade-right">
                    <?php foreach ( $service_items as $i => $item ) : ?>
                    <button class="service-tab-item<?php echo $i === 0 ? ' active' : ''; ?>"
                            type="button"
                            data-target="#service-pane-<?php echo esc_attr( $i ); ?>"
                            aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>">
                        <span class="item-icon" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.3371 14.9613L1.62358 1.24733C1.15045 1.03248 0.585894 1.16047 0.25676 1.56732C0.0957054 1.76439 0.00546218 2.00982 0.00048901 2.26428C-0.00448416 2.51874 0.0761006 2.7675 0.229332 2.97071L10.0005 15.999L0.229332 29.0272C-0.0860891 29.4455 -0.0746608 30.0261 0.254474 30.4306C0.476183 30.7072 0.807603 30.8557 1.14359 30.8557C1.30588 30.8557 1.46816 30.8215 1.6213 30.7506L31.3349 17.0367C31.7417 16.8492 32 16.4447 32 15.999C32 15.5533 31.7417 15.1487 31.3371 14.9613Z" fill="currentColor"/>
                            </svg>
                        </span>
                        <?php if ( $item['svc_title'] ) : ?>
                        <span class="item-title"><?php echo esc_html( $item['svc_title'] ); ?></span>
                        <?php endif; ?>
                    </button>
                    <?php endforeach; ?>
                </div>

                <!-- Pane list (right panel) -->
                <div class="service-pane-list" data-aos="fade-left" data-aos-delay="150">
                    <?php foreach ( $service_items as $i => $item ) :
                        $card_img = $item['svc_card_image'];
                    ?>
                    <article class="service-pane<?php echo $i === 0 ? ' active' : ''; ?>"
                             id="service-pane-<?php echo esc_attr( $i ); ?>">
                        <?php if ( $card_img ) : ?>
                        <div class="pane-image img-cover">
                            <img src="<?php echo esc_url( $card_img['url'] ); ?>"
                                 alt="<?php echo esc_attr( $item['svc_title'] ); ?>">
                        </div>
                        <?php endif; ?>
                        <div class="pane-overlay"></div>
                        <div class="pane-content">
                            <?php if ( $item['svc_card_subtitle'] ) : ?>
                            <div class="pane-subtitle"><?php echo esc_html( $item['svc_card_subtitle'] ); ?></div>
                            <?php endif; ?>
                            <button class="service-more-btn"
                                    type="button"
                                    data-popup-target="service-popup-<?php echo esc_attr( $i ); ?>">
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </article>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Popup modals (one per service) -->
            <?php foreach ( $service_items as $i => $item ) :
                $gallery = $item['svc_gallery'];
            ?>
            <div class="service-popup"
                 id="service-popup-<?php echo esc_attr( $i ); ?>"
                 aria-hidden="true">
                <button class="service-popup-overlay"
                        type="button"
                        aria-label="Đóng popup"
                        data-popup-close="true"></button>
                <div class="service-popup-dialog"
                     role="dialog"
                     aria-modal="true"
                     aria-labelledby="service-popup-title-<?php echo esc_attr( $i ); ?>">
                    <button class="service-popup-close"
                            type="button"
                            aria-label="Đóng popup"
                            data-popup-close="true">
                        <i class="fa-light fa-xmark"></i>
                    </button>
                    <div class="service-popup-grid">

                        <!-- Copy -->
                        <div class="service-popup-copy">
                            <?php if ( $item['svc_popup_title'] ) : ?>
                            <h3 class="service-popup-title"
                                id="service-popup-title-<?php echo esc_attr( $i ); ?>">
                                <?php echo esc_html( $item['svc_popup_title'] ); ?>
                            </h3>
                            <?php endif; ?>
                            <?php if ( $item['svc_popup_content'] ) : ?>
                            <div class="service-popup-desc">
                                <?php echo wp_kses_post( $item['svc_popup_content'] ); ?>
                            </div>
                            <?php endif; ?>
                            <div class="popup-copy-corner" aria-hidden="true">
                                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/svg-of-text-corner-bottom.svg' ); ?>" alt="Popup corner decoration">
                            </div>
                        </div>

                        <!-- Gallery slider -->
                        <?php if ( $gallery ) : ?>
                        <div class="service-popup-media">
                            <div class="service-popup-slider" data-popup-slider="<?php echo esc_attr( $i ); ?>">
                                <!-- Main slider -->
                                <div class="swiper service-popup-top">
                                    <div class="swiper-wrapper">
                                        <?php foreach ( $gallery as $slide ) :
                                            $slide_img = $slide['svc_gallery_image'];
                                        ?>
                                        <div class="swiper-slide">
                                            <?php if ( $slide_img ) : ?>
                                            <div class="image img-cover">
                                                <img src="<?php echo esc_url( $slide_img['url'] ); ?>"
                                                     alt="<?php echo esc_attr( $slide_img['alt'] ); ?>">
                                            </div>
                                            <?php endif; ?>
                                        </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <!-- Controls + thumbs -->
                                <div class="service-popup-controls">
                                    <button class="button-prev" type="button" aria-label="Xem ảnh trước">
                                        <i class="fa-light fa-chevron-left"></i>
                                    </button>
                                    <div class="swiper service-popup-thumbs">
                                        <div class="swiper-wrapper">
                                            <?php foreach ( $gallery as $slide ) :
                                                $slide_img = $slide['svc_gallery_image'];
                                            ?>
                                            <div class="swiper-slide">
                                                <?php if ( $slide_img ) : ?>
                                                <div class="thumb-image img-cover">
                                                    <img src="<?php echo esc_url( $slide_img['url'] ); ?>"
                                                         alt="<?php echo esc_attr( $slide_img['alt'] ); ?>">
                                                </div>
                                                <?php endif; ?>
                                            </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                    <button class="button-next" type="button" aria-label="Xem ảnh tiếp theo">
                                        <i class="fa-light fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <?php endif; ?>

                    </div>
                </div>
            </div>
            <?php endforeach; ?>

            <?php endif; /* end service_items */ ?>
        </div>
    </section>

    <?php /* ─── 8. Dịch vụ Bến Phao ─────────────────────────────────── */ ?>
    <?php
    $mooring_section_id = get_field( 'mooring_section_id' );
    $mooring_title      = get_field( 'mooring_title' );
    $mooring_image      = get_field( 'mooring_image' );
    $mooring_stats      = get_field( 'mooring_stats' );
    $mooring_content    = get_field( 'mooring_content' );
    ?>
    <section class="section-cangcanphumy-mooring"<?php if ( $mooring_section_id ) echo ' id="' . esc_attr( $mooring_section_id ) . '"'; ?>>
        <div class="container-full">
            <div class="mooring-grid">

                <!-- Media (image + stats) -->
                <div class="mooring-media" data-aos="fade-right">
                    <?php if ( $mooring_image ) : ?>
                    <div class="mooring-image img-cover">
                        <img src="<?php echo esc_url( $mooring_image['url'] ); ?>"
                             alt="<?php echo esc_attr( $mooring_image['alt'] ); ?>">
                    </div>
                    <?php endif; ?>
                    <?php if ( $mooring_stats ) : ?>
                    <div class="mooring-stats">
                        <?php foreach ( $mooring_stats as $stat ) :
                            $icon = $stat['stat_icon'];
                        ?>
                        <div class="article-stat">
                            <?php if ( $icon ) : ?>
                            <div class="stat-icon">
                                <img src="<?php echo esc_url( $icon['url'] ); ?>" alt="Mooring service stat icon">
                            </div>
                            <?php endif; ?>
                            <?php if ( $stat['stat_value'] ) : ?>
                            <div class="stat-value"><?php echo esc_html( $stat['stat_value'] ); ?></div>
                            <?php endif; ?>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>

                <!-- Content -->
                <div class="mooring-content" data-aos="fade-left" data-aos-delay="150">
                    <div class="content-inner">
                        <?php if ( $mooring_title ) : ?>
                        <h2 class="section-title"><?php echo esc_html( $mooring_title ); ?></h2>
                        <?php endif; ?>
                        <?php if ( $mooring_content ) : ?>
                        <div class="content-list">
                            <?php foreach ( $mooring_content as $item ) : ?>
                            <?php if ( $item['content_desc'] ) : ?>
                            <div class="copy-desc">
                                <?php echo wp_kses_post( $item['content_desc'] ); ?>
                            </div>
                            <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>

            </div>
        </div>
    </section>

</main>

<?php
get_footer();
?>
