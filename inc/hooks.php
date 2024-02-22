<?php
namespace MtphrBlockTesting;

add_action( 'init', __NAMESPACE__ . '\register_blocks' );

function register_blocks() {
  register_block_type( BTESTING_PLUGIN_DIR . "/build/blocks/accordion" );
  register_block_type( BTESTING_PLUGIN_DIR . "/build/blocks/accordion-section" );
  register_block_type( BTESTING_PLUGIN_DIR . "/build/blocks/swiper-slider" );
}