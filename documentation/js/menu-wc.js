'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">acreativity documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' : 'data-target="#xs-components-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' :
                                            'id="xs-components-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommunicationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommunicationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactSectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactSectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeaturedProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeaturedProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GraphicContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphicContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeadingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MailBoxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MailBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainBannerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainBannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductSliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductSliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShopComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShopComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SigninComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SigninComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpacerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpacerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminAddProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminAddProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminChartCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminChartCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminMailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminMailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminMailComposeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminMailComposeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminMailSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminMailSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminMailWriterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminMailWriterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductColorChooserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductColorChooserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductDetailsFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductDetailsFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductFeaturesFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductFeaturesFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductImageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductImageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminProductsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminProductsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorAdminStatusCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminStatusCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' : 'data-target="#xs-directives-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' :
                                        'id="xs-directives-links-module-AppModule-1343685684bb92f4258b1728da8429c0"' }>
                                        <li class="link">
                                            <a href="directives/VendorAdminColorChooserDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">VendorAdminColorChooserDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChartConfiguration.html" data-type="entity-link">ChartConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/Color.html" data-type="entity-link">Color</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormComponent.html" data-type="entity-link">FormComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductColor.html" data-type="entity-link">ProductColor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductSize.html" data-type="entity-link">ProductSize</a>
                            </li>
                            <li class="link">
                                <a href="classes/Size.html" data-type="entity-link">Size</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatusCard.html" data-type="entity-link">StatusCard</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AboutService.html" data-type="entity-link">AboutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link">CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactService.html" data-type="entity-link">ContactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormResolverService.html" data-type="entity-link">FormResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link">HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VendorAdminDashboardService.html" data-type="entity-link">VendorAdminDashboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VendorAdminProductService.html" data-type="entity-link">VendorAdminProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WidgetManagerService.html" data-type="entity-link">WidgetManagerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FormInputInterface.html" data-type="entity-link">FormInputInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});