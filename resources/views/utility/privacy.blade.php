@extends(Auth::check() ? 'layouts.app' : 'layouts.guest.header')

@section('content')

    <div class="container">
        <div class="my_row terms form_page">
            <h2 class="page_title">Privacy Policy</h2>
            <div class="card guest">
                <div class="card-body">
                    <p>
                        LinkPro LLC (hereinafter “LinkPro”, "we", "our", or "us") is committed to protecting the privacy of all the individuals accessing and using its website at
                        <a class="text-decoration-underline" href="@php echo URL::to('/') @endphp">@php echo URL::to('/') @endphp</a> (hereinafter "Website"). This Data Privacy Policy describes how we collect, use, disclose, and transfer the personal information* that our Visitors and Users (as defined under our Terms and Conditions,
                        <a class="text-decoration-underline" href={{ route('terms') }}>{{ route('terms') }}</a>) provide to us or that we collect about them when they access and/or use our Website. This Data Privacy Policy is about LinkPro’s collection and use of its Website’s Users’ and Visitors’ personal data only. End Users (as defined under our
                        <a class="text-decoration-underline" href="{{ route('terms') }}">Terms and Conditions</a> should directly contact the Users if they have questions about their personal data collection by the Users.
                    </p>
                    <p>
                        By accessing and using our Website, you agree to the collection and use of your personal information and other information in accordance with this Policy. When you provide your personal information to us, you accept that we may retain it and that it may be held by us or any third party that processes it on our behalf for the purposes of providing the information or services which you have requested. Any third parties who process personal information on our behalf are required to maintain the confidentiality and privacy of the personal information that they process for us. However, we cannot control said third parties’ privacy and security policies, such that you agree that LinkPro shall not be liable for any security breach or negligence or other liability arising from said third parties’ acts and omissions.
                    </p>
                    <p>
                        LinkPro supports the Children's Online Privacy Protection Act and other frameworks like the General Data Protection Regulation and the UK’s version of the EU’s GDPR. Children under the age of 13 are not authorized to access and use our Website. Upon knowledge, we will take reasonable efforts to ensure that any information provided by all children under the age of 13 or their guardian/parent is erased or destroyed. For children between 13 and 17 years of age, pursuant to our
                        <a class="text-decoration-underline" href="{{ route('terms') }}">Terms and Conditions</a>, they must obtain the consent of their parent/guardian. Upon knowledge of their failure to do so, we will take reasonable efforts to erase or destroy their data collected or stored by LinkPro.
                    </p>
                    <p>
                        If you provide us with information about another person, you must ensure that you have the consent of the other person and that he/she is aware of the terms of this Data Privacy Policy.
                    </p>
                    <p>
                        LinkPro does not collect sensitive personal information such as your race or ethic origin, religious, philosophical or other beliefs, political opinions, membership of political parties, trade unions, associations, or organizations of a religious, philosophical, or trade-unionist character, medical or health conditions, and sex life.
                    </p>
                    <p>
                        This Data Privacy Policy is effective as of August 24th, 2021. In order to comply with new laws and regulations, we may change this Policy from time to time. The then-current Data Privacy Policy applies to all data collected by LinkPro. It is your obligation to check back regularly to keep informed of updates and do not use the Website if you do not agree to this Data Privacy Policy or the then-current Data Privacy Policy.
                    </p>
                    <p class="blue_text bold_text">HOW WE COLLECT YOUR PERSONAL DATA</p>
                    <p>
                        <span class="blue_text bold_text">Visitors and Users.</span> We collect information from visitors through the use of online forms and every time you e-mail us your details. If you register with us and create an account (either Pro Plan or Corporate Plan) on the Website, during the registration process you will be asked to submit personal information about yourself (such as your name, address, email address, phone number, billing information*). We may also collect personal information from you when you correspond with us (for example, when you send us e-mail communications, letters, or otherwise make inquiries about your account), when you respond to our surveys, or when you comment on our Website or other forums.
                    </p>
                    <p>
                        <small>
                            * “<span class="bold_text">Personal information/data</span>” means any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.
                            * Payment information is solely collected and processed by Braintree Gateway.
                        </small>
                    </p>
                    <p>
                        <span class="blue_text bold_text">Cookies.</span> Some of our web pages use cookies (text files that are stored on your computer and saved by your browser). Cookies should not harm your computer and should not contain any viruses. We use cookies because cookies help make our website more user-friendly, efficient, and secure. Most of the cookies we use are so-called "session cookies." They are automatically deleted after your visit. Other cookies remain in your device's memory until you delete them. These cookies make it possible to recognize your browser when you next visit the Website.
                        <br>
                        You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of our Website and other services. Some cookies, which are necessary to allow electronic communications or to provide certain functions you wish to use, are stored pursuant to applicable laws and regulations. We have a legitimate interest in the storage of cookies to ensure an optimized service provided free of technical errors and with contents corresponding to your interests.
                    </p>
                    <p>
                        <span class="blue_text bold_text">Server log files.</span> We automatically collect and store information that your browser automatically transmits to us in "server log files." These include, but may not be limited to:
                    </p>
                    <ul>
                        <li>
                            <p>
                                Browser type and browser version
                            </p>
                        </li>
                        <li>
                            <p>
                                Operating system used
                            </p>
                        </li>
                        <li>
                            <p>
                                Referrer URL
                            </p>
                        </li>
                        <li>
                            <p>
                                Host name of the accessing computer
                            </p>
                        </li>
                        <li>
                            <p>
                                Time of the server request
                            </p>
                        </li>
                        <li>
                            <p>
                                IP address
                            </p>
                        </li>
                    </ul>
                    <p class="blue_text bold_text">
                        Analytics and Advertising
                    </p>
                    <p>
                        <span class="blue_text text-decoration-underline bold_text">Google Services.</span> Our Website may use various Google Services, provided or operated by the following responsible party:
                        <br>
                        If you are located within the EU or Switzerland, the party(s) responsible for the services provided is Google Ireland Limited (“Google”), Gordon House, Barrow Street, Dublin 4, Ireland.
                        <br>
                        If you are located outside the EU, the party responsible for the services provided is Google LLC (“Google”), 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
                        <br>
                        <span class="blue_text">Google Analytics.</span> Our Website may use Google Analytics, a web analytics service. Google Analytics uses cookies. The information generated by the cookie about your use of this Website is usually transmitted to a Google server in the USA and stored there. We analyze user behavior to optimize both the Website and for advertising purposes. You can prevent the collection of your data by Google Analytics by clicking on the following link. An opt-out cookie will be set to prevent your data from being collected on future visits to this site: Disable Google Analytics. For more information about how Google Analytics handles user data, the “Safeguarding your data” article in conjunction with the Google Privacy Policy at
                        <a class="blue_text text-decoration-underline" href="https://support.google.com/analytics/answer/6004245?hl=en">https://support.google.com/analytics/answer/6004245?hl=en</a>.
                        <br>
                        <span class="blue_text">Google Adwords.</span> Our Website may use Google AdWords, an online advertising program which uses cookies. If you do not want to participate in Google Adwords, you can opt out of this easily by disabling the Google Adwords cookie in your browser settings. We analyze user behavior through Google AdWords to both optimize our Website and for advertising purposes. For more information about Google AdWords, see the Google Privacy Policy:
                        <a class="blue_text text-decoration-underline" href="https://www.google.de/policies/privacy/">https://www.google.de/policies/privacy/</a>.
                        <br>
                        You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of our Website.
                        <br>
                        <span class="blue_text">Google Analytics Remarketing.</span> Our Websites may use the features of Google Analytics Remarketing. This feature makes it possible to link target audiences for promotional marketing created with Google Analytics Remarketing to the cross-device capabilities of Google AdWords and Google DoubleClick. This allows advertising to be displayed based on your personal interests, identified based on your previous usage and surfing behavior on one device (e.g. your mobile phone), on other devices (such as a tablet or computer).
                        <br>
                        Once you have given your consent, Google will associate your web and app browsing history with your Google Account for this purpose. That way, any device that signs in to your Google Account can use the same personalized promotional messaging.
                        <br>
                        To support this feature, Google Analytics collects Google-authenticated IDs of users that are temporarily linked to our Google Analytics data to define and create audiences for cross-device ad promotion. We analyze anonymous user behavior for advertising purposes.
                        <br>
                        You can permanently opt out of cross-device remarketing/targeting by turning off personalized advertising in your Google Account; follow this link:
                        <a class="blue_text text-decoration-underline" href="https://www.google.com/settings/ads/onweb/">https://www.google.com/settings/ads/onweb/</a>. for more information about Google Analytics Remarketing, go to:
                        <a class="blue_text text-decoration-underline" href="https://www.google.com/policies/technologies/ads/">https://www.google.com/policies/technologies/ads/</a>.
                        <span class="blue_text">Google Conversion Tracking.</span> Our Website may use Google Conversion Tracking. When you click on an ad served by Google, a conversion tracking cookie is set. Cookies are small text files that your internet browser stores on your computer. These cookies expire after 30 days and are not used for personal identification of the user. Should the user visit certain pages of the Website and the cookie has not yet expired, Google and the Website can tell that the user clicked on the ad and proceeded to that page. The information obtained using the conversion cookie is used to create conversion statistics for the AdWords advertisers who have opted for conversion tracking. Customers are told the total number of users who clicked on their ad and were redirected to a conversion tracking tag page. However, advertisers do not obtain any information that can be used to personally identify users. We analyze user behavior to optimize both our Website and for advertising purposes. If you do not want to participate in tracking, you can opt-out of this by easily disabling the Google Conversion Tracking cookie by changing your browser settings. In doing so, you will not be included in the conversion tracking statistics.
                        <br>
                        You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of the Website.
                        <br>
                        For more information about Google Conversion Tracking, see the Google Privacy Policy at  https://www.google.de/policies/privacy/.
                    </p>
                    <p>
                        <span class="blue_text text-decoration-underline bold_text">Facebook.</span> Our Website may use Facebook remarketing ads, an interest-based advertising service provided by Facebook Inc. We analyze user behavior through Facebook to both optimize our Website and for advertising purposes. You can elect to op-out of this service by following the instructions at
                        <a class="blue_text text-decoration-underline" href="https://www.facebook.com/help/568137493302217">https://www.facebook.com/help/568137493302217</a>. For more information about Facebook remarketing ads and your data collection, see the following articles:
                        <a class="blue_text text-decoration-underline" href="https://www.facebook.com/help/516147308587266/how-ads-work-on-facebook/?helpref=hc_fnav">https://www.facebook.com/help/516147308587266/how-ads-work-on-facebook/?helpref=hc_fnav</a>
                        <a class="blue_text text-decoration-underline" href="https://www.facebook.com/privacy/explanation">https://www.facebook.com/privacy/explanation</a>
                    </p>
                    <p>
                        <span class="blue_text bold_text">PURPOSE OF COLLECTING YOUR PERSONAL DATA</span>
                        <br>
                        We will collect your personal data if (i) there’s a legitimate interest, (ii) we receive your consent, (iii) it is necessary to perform our contractual obligations, or (iv) it is required to comply with applicable laws and regulations. Specifically, we may collect your personal data to:
                        <br>
                    </p>
                    <ul>
                        <li>
                            <p>
                                provide, personalize, and improve our Services;
                            </p>
                        </li>
                        <li>
                            <p>
                                provide Services based on your interests;
                            </p>
                        </li>
                        <li>
                            <p>
                                deal with your inquiries and requests (such as complaints or support requests);
                            </p>
                        </li>
                        <li>
                            <p>
                                administer orders and accounts relating to our Users with enhanced plans;
                            </p>
                        </li>
                        <li>
                            <p>
                                administer User records and verify identity;
                            </p>
                        </li>
                        <li>
                            <p>
                                [allow you to participate in the interactive features or surveys on the Website, where you choose to do so;]
                            </p>
                        </li>
                        <li>
                            <p>
                                send you service-related communications, including announcements and administrative messages;
                            </p>
                        </li>
                        <li>
                            <p>
                                understand how the Website is used so that we can continuously improve it and the Services we provide to
                                you;
                            </p>
                        </li>
                        <li>
                            <p>
                                to comply with applicable laws and regulations;
                            </p>
                        </li>
                        <li>
                            <p>
                                to comply with compelled disclosures; and
                            </p>
                        </li>
                        <li>
                            <p>
                                send you information about products, services, and promotions relating to us [and/or other third party partners] in accordance with your communication preferences.
                            </p>
                        </li>
                    </ul>
                    <p>
                        We may also generate, use, and disclose aggregated and/or anonymized information and statistics about the Website for marketing and strategic purposes. However, no individual will be individually identifiable from these aggregated and/or anonymized information and statistics.
                    </p>
                    <p>
                        You may opt out of receiving information about our Services by clicking on the 'unsubscribe' link in the emails we send, or by selecting the relevant option on the Website.
                        <br>
                        <span class="blue_text bold_text">DATA RETENTION</span>
                        <br>
                        We will store your personal data as long as necessary to fulfill the aforementioned purposes and until required by applicable laws and regulations.
                    </p>
                    <p>
                        <span class="blue_text bold_text">DATA PROTECTION</span>
                        <br>
                        Given that the Internet is a global environment, using the Internet to collect and process personal information necessarily involves the transmission of data on an international basis. Therefore, by browsing the Website and communicating electronically with us, you acknowledge our processing of personal information in this way. We will endeavor to protect all personal information collected through the Website in accordance with applicable industry standards. We have implemented adequate safeguard measures per the industry standards as well as applicable laws and regulations to protect your personal data, such as contracting with a PCI-DSS compliant vendor to process Users’ payments, limiting access or disclosing your personal information only to our staff, agents, law enforcement authorities, contractors, other business partners, and future assignees/subsidiaries/affiliates/successors.
                    </p>
                    <p>
                        <span class="blue_text bold_text">THIRD-PARTY PAYMENT PROCESSOR</span>
                        <br>
                        Users’ payment information is directly provided to Braintree Gateway and the collection and use of your personal data are subject to Braintree Gateway Services Agreement and Data Privacy Policy available at:
                        <a href="https://www.braintreepayments.com/legal/braintree-privacy-policy">(https://www.braintreepayments.com/legal/braintree-privacy-policy)</a>
                    </p>
                    <p>
                        <span class="blue_text bold_text">OTHER WEBSITES</span>
                        <br>
                        The Website may contain links to other websites which are outside our control and are not covered by this Data Privacy Policy. If you access other sites using the links provided, the operators of these sites may collect information from you which will be used by them in accordance with their data privacy policy, which may differ from ours.
                    </p>
                    <p>
                        <span class="blue_text bold_text">EXERCISE YOUR  RIGHTS REGARDING YOUR PERSONAL DATA</span>
                        <br>
                        You always have the right to request information about your stored personal data, its origin, its recipients,
                        and the purpose of its collection. You also have the right to request that your personal data be corrected, blocked, or deleted. Your rights will also depend on the applicable laws and regulations. For instance, if the General Data Protection Regulation applies, you are also entitled to the right: i) to consent; ii) to be forgotten; iii) to be informed; iii) to have access to your data; (iv) to modify your data; and (v) to data portability.
                    </p>
                    <p>
                        To obtain a copy of the personal information we hold about you, please contact us at support@link.pro. For mail delivery, please note that we are entitled to charge a small fee of $9.99 for providing you with copies of personal information that we may hold about you. You can contact us at any time if you have further questions, need more information about the issue of privacy and data protection, or for complaints or withdrawal of your consent at support@link.pro.
                    </p>
                    <p>
                        <span class="blue_text bold_text">OPPOSITION TO UNSOLICITED EMAIL</span>
                        <br>
                        We hereby expressly prohibit the use of the contact information herein to send us promotional and informational materials not expressly requested. We reserve the right to take specific legal action if unsolicited advertising material, such as email spam, is received.
                    </p>
                </div>
            </div>
        </div>
    </div>

@endsection
