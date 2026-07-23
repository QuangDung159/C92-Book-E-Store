const { withPodfile } = require('@expo/config-plugins');

const withNonModularHeaders = (config) => {
  return withPodfile(config, (config) => {
    let podfileContent = config.modResults.contents;

    // 1. Inject $RNFirebaseAsStaticFramework = true if missing
    if (!podfileContent.includes('$RNFirebaseAsStaticFramework')) {
      podfileContent = podfileContent.replace(
        'prepare_react_native_project!',
        `$RNFirebaseAsStaticFramework = true\nprepare_react_native_project!`,
      );
    }

    // 2. Inject post_install build settings loop AFTER react_native_post_install
    if (
      !podfileContent.includes(
        'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES',
      )
    ) {
      const postInstallPatch = `
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
        config.build_settings['CLANG_WARN_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'NO'
      end
    end`;

      // Find the end of react_native_post_install statement or insert before the last 'end' in post_install block
      podfileContent = podfileContent.replace(
        /:ccache_enabled => ccache_enabled\?\(podfile_properties\),\n\s*\)/,
        `:ccache_enabled => ccache_enabled?(podfile_properties),\n    )${postInstallPatch}`,
      );
    }

    config.modResults.contents = podfileContent;
    return config;
  });
};

module.exports = withNonModularHeaders;
