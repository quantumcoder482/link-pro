import React from 'react';
import {Link} from '@inertiajs/react';

const PageContent = ({pageName}) => {

    const switchStatement = () => {
        switch (pageName) {
            case "terms":
                return (
                    <div className="card guest">
                        <div className="card-body">
                            <h2 className="page_title">Terms And Conditions</h2>
                            <h4>Effective Date: August 5, 2021</h4>
                            <p>
                                PLEASE READ THE FOLLOWING TERMS AND CONDITIONS (INCLUDING THE LEGAL DISCLAIMER, LIABILITY LIMITATIONS, AND OTHER PROVISIONS BELOW) CAREFULLY BEFORE USING THIS WEBSITE OR USING OUR OTHER SERVICES. By using the Website or our other Services, you warrant that you are at least eighteen (18) years of age and have the legal capacity to enter legally binding agreements. If you are under the age of eighteen (18) years old, you are prohibited from using the Website unless your parent or guardian agrees to be bound by our Terms and Conditions on your behalf. You agree to be legally bound by these Terms and Conditions as well the processing of your personal data in accordance with our Privacy Policy, which can be found here:
                                <Link className="text-decoration-underline" href={route('privacy')}> {route('privacy')}</Link>. If you do not agree to these Terms and Conditions and/or our Privacy Policy, you may not use our Website or our other Services. We may amend these Terms and Conditions and/or our Privacy Policy from time to time. We will publish these modifications on the Website. It is your responsibility to check the Website periodically for modifications to these Terms and Conditions and our Privacy Policy. These modifications will take effect when we publish the revised documents on our Website, unless you oppose or object via email or in writing within seven (7) days of said modifications. If you do not oppose as stated herein and continue to use the Website or our other Services, the modifications made to the Terms and Conditions and/or our Privacy Policy will become binding and will constitute an integral part of the aforementioned.
                            </p>
                            <p>
                                NOTICE: COMPETITORS OF LINKPRO LLC MAY NOT ACCESS THE SERVICES WITHOUT OUR PRIOR WRITTEN CONSENT FOR ANY PURPOSE, INCLUDING MONITORING AVAILABILITY, PERFORMANCE, OR FUNCTIONALITY, OR FOR OTHER BENCHMARKING OR COMPETITIVE PURPOSE(S).
                            </p>
                            <p>
                                All headings herein are inserted only for convenience and ease of reference and are not to be considered in the construction or interpretation of any provision of this Agreement. The singular shall include the plural, and the masculine gender shall include the feminine and neuter, and vice versa, as the context requires.
                            </p>
                            <p>
                                All terms requiring definitions in the above introduction are found in the Definitions section below.
                            </p>
                            <h4 className="title text-decoration-underline">1. DEFINITIONS</h4>
                            <p>
                                “Affiliate” refers to any Users marketing LinkPro LLC’s Services through their Page.
                            </p>
                            <p>
                                “Days” refers to business days, unless specifically stated otherwise.
                            </p>
                            <p>
                                “Premier Plan” refers to a paid plan, with the price dictated in the Order Form. The Premier Plan shall include all the features of the Free Plan and the Pro Plan, in addition to the availability of up to five (5) unique links and the availability of password protected links. The Premier Plan shall also include or exclude any features LinkPro LLC chooses to add or remove at their sole discretion at any time for any reason.
                            </p>
                            <p>
                                “End Users” refers to the individuals or representatives of entities (including, but not limited to, companies, partnerships, joint ventures, associations, and any governmental agencies) accessing or using your Page.
                            </p>
                            <p>
                                “Feedback” refers to your input (including, but not limited to, ideas, suggestions, comments, and ideas) regarding the Website and our other Services.
                            </p>
                            <p>
                                "Intellectual Property (IP)" refers to trademarks (registered or unregistered), copyrights, trade secrets, trade names, service marks, know-how, patents and patent applications, websites and internet domain name registrations, and other intellectual property and related proprietary rights, interests, and protections throughout the world.
                            </p>
                            <p>
                                "Liabilities" refers to liabilities, obligations, or commitments of any nature whatsoever, asserted or unasserted, known or unknown, absolute or contingent, accrued or unaccrued, matured or unmatured, or otherwise.
                            </p>
                            <p>
                                "Legal Proceeding" refers to any claim, investigation, hearing, legal action, or other legal, administrative, arbitral, or similar proceeding, whether civil or criminal (including any appeal or review of any of the foregoing).
                            </p>
                            <p>
                                “Litigation Expenses” refers to any reasonable out-of-pocket expense incurred in defending an Indemnifiable Proceeding (Direct Claim or Third-Party Claim) or in any related investigation or negotiation, including court filing fees, court costs, arbitration fees, witness fees, and attorneys’ and other professionals’ fees and disbursements.
                            </p>
                            <p>
                                “Losses” refers to any amount awarded in, or paid in settlement of, any Indemnifiable Proceeding (Direct Claim or Third-Party Claim), including any interest accrued, but excluding any Litigation Expenses.
                            </p>
                            <p>
                                “Malicious Code” refers to viruses, worms, time bombs, Trojan horses, and other harmful or malicious code, files, scripts, agents, or programs.
                            </p>
                            <p>
                                “Privacy Policy” refers to the policy available at [Link to URL of Privacy Policy].
                            </p>
                            <p>
                                “Pro Plan” refers to a paid plan, with the price dictated in the Order Form. The Pro Plan shall include all the features of the Free Plan in addition to customizable icons, customized icon names, and unlimited icons. The Pro Plan shall also include or exclude any features LinkPro LLC chooses to add or remove at their sole discretion at any time for any reason.
                            </p>
                                <p>
                                    “Services” refers to LinkPro LLC’s products made available to our Users (including their End Users).
                                </p>
                                <p>
                                    “Free Plan” refers to an account providing access to LinkPro LLC’s services free of charge. Said plans include customizable profile and header images, up to nine (9) standard icons, and customizable page link(s), title, and biography text. The features of this plan shall also be modifiable by LinkPro LLC at their sole discretion at any time for any reason.
                                </p>
                                <p>
                                    “User(s)” refers to individual(s) or representative(s) of entities accessing and using LinkPro LLC’s Services through an account.
                                </p>
                                <p>
                                    “User Content” refers to all information, data, text, software, sound, photographs, graphics, messages, or other materials, whether stored, posted, uploaded, e-mailed, shared, or otherwise transmitted by Users (or End users) while using our Services.
                                </p>
                                <p>
                                    “We,” “us,” or “our” refers to LinkPro LLC.
                                </p>
                                <p>
                                    “Website” refers to https://link.pro/
                                </p>
                                <p>
                                    “You” or “your” refers to the Website’s visitors and Users.
                                </p>
                                <p>
                                    “Your Data” refers to all electronic data
                                </p>
                                <h4 className="title text-decoration-underline">2. ENTIRE AGREEMENT</h4>
                                <p>
                                    To the extent legally permitted, this Agreement and the other documents that are referenced in this agreement constitute the entire agreement between you and LinkPro LLC regarding your access and use of the Website and our Services, and together they supersede all prior and contemporaneous agreements, proposals, representations, written or oral, between you and LinkPro LLC. The terms may only be modified as provided above.
                                </p>
                                <h4 className="title text-decoration-underline">3. ORDER FORMS AND SERVICES</h4>
                                <h4 className="sub_title">3.1 Order Form</h4>
                                <p>
                                    These Terms and Conditions are incorporated by reference into each Order Form submitted by Users. Together, these Terms and Conditions and the Order Form comprise a binding agreement between Users and LinkPro LLC, effective as of the date specified in the Order Form, and only as it pertains to Services provided pursuant to this specific Order Form and continuing for the term stated in the Order Form, unless terminated or canceled by LinkPro LLC or User.
                                </p>
                                <h4 className="sub_title">3.2 License and Ownership</h4>
                                <p>
                                    Subject to these Terms and Conditions, during the term of the applicable Order Form, we will provide Users (including their End Users) with a non-exclusive, revocable, non-transferable, and non-sublicensable license to use and have access to our Services as upgraded from time to time through your account. Except for the foregoing license, no other rights in the Services are granted to Users, and the Services (including the Website, their content with the exception of User Content, features, functionalities, and any other materials provided by LinkPro LLC), shall remain the sole and exclusive property of LinkPro LLC and its licensors, if any, whether the Services are separate or integrated with any other products, services or deliverables. Users agree that their access or use of the Services is not contingent on the delivery of any future functionality or features, nor is it dependent on any public statements made by LinkPro LLC regarding future functionality or features.
                                </p>
                                <h4 className="sub_title">3.3 Account</h4>
                                <p>
                                    To access and use LinkPro LLC’s Services, each User shall have an account and take adequate safeguard measures to keep the user identification and password confidential. Cybersquatting is prohibited, and user identifications shall neither misappropriate nor infringe any third party’s IP rights and shall not be vulgar, obscene or offensive. To the extent legally permitted, Users will be held fully responsible for their own or third parties’ activities (such as IP violations, adverse impact on LinkPro LLC’s goodwill, or violation of applicable laws and regulations) that relate to the Users’ accounts. Without limiting its other remedies available at law, in equity or by statute, LinkPro LLC reserves the right to reallocate user identifications and to cancel or suspend a User’s account if the User does not comply with this Section. A User may request the cancellation and/or deletion of their account at any time. LinkPro LLC will subsequently delete promptly and permanently Your Data except if otherwise instructed by the User.
                                </p>
                                <p>
                                    Each account shall have a unique Username for identification purposes, submitted by the User. LinkPro LLC reserves the right to deny any Username, at it’s sole discretion, including, but not limited to, unavailability or offensiveness. LinkPro LLC shall not be responsible for providing justification to the User for denial of any particular Username. <span className="text-decoration-underline">LinkPro also reserves the right to remove from LinkPro LLC’s platform  a User’s account, at LinkPro’s Sole Discretion, at any time.</span> If a Pro or Premier Plan is taken down under said circumstances, then the User shall receive a pro-rated refund of any amounts paid within sixty (60) days.
                                </p>
                                <h4 className="sub_title">3.4 User Content</h4>
                                <p>
                                    To the extent legally permitted, Users shall be fully liable for their User Content (including the contents of their End Users). The User Content is the sole property and responsibility of the User. LinkPro LLC does not control User Content posted via the Service and, as such, will not be liable in any way for any User Content. Although we do not prescreen User Content, we shall have the right (but not the obligation) in our sole discretion and without limiting others’ rights or remedies available to us, to refuse or remove any User Content that is available via the Services if they are unlawful, unreliable, inappropriate, abusive, incite hatred, objectionable, or violate the privacy rights, publicity rights, contractual rights, IP rights or any other rights of any individuals or entities. Users warrant that they (or their End Users) have the right to use User Content and grant LinkPro LLC a worldwide, royalty-free, transferable, irrevocable, and perpetual license to post, share, or otherwise transmit User Content on the Website.
                                </p>
                                <h4 className="sub_title">3.5 Your Data</h4>
                                <p>
                                    LinkPro LLC shall maintain commercially reasonable administrative, physical, and technical safeguards for protection of the security, confidentiality, and integrity of Your Data. Subject to the limited rights granted by you, pursuant to these Terms and Conditions, we acquire no right, title or interest from you under these Terms and Conditions in or to Your Data, including any intellectual property rights therein. LinkPro LLC may de- identify and de- aggregate Your Data for benchmarking, Service development, and quality assurance purposes, provided that LinkPro LLC de-identifies such data in compliance with applicable laws and regulations. For the avoidance of doubt, de-identified information does not constitute Your Data.
                                </p>
                                <p>
                                    To the extent legally permitted, LinkPro LLC shall not be liable to you or any third party for loss, destruction, or corruption of Your Data. You agree and acknowledge that you are in a better position to foresee and evaluate any potential damage or loss you may suffer in connection with a loss of Your Data by taking into account the liability limitation contained herein.
                                </p>
                                <p>
                                    f during the provision of the Services LinkPro LLC has access to personal data of the EU residents, LinkPro LLC as data processor will always comply with applicable data protection laws, in particular process such personal data solely for the purpose of providing the Services, to oblige its employees to maintain personal data confidential and to instruct them about the individual privacy provisions to which they should adhere. LinkPro LLC shall maintain the technical and organizational measures required under the General Data Protection Regulation (Regulation (EU) 2016/679) ("GDPR") for protection of the security, confidentiality, and integrity of your personal data. LinkPro LLC in its role as data processor acquires no right, title, or interest from you under these Terms and Conditions in or to Your Data, including any intellectual property rights therein. LinkPro LLC and you undertake at all times to comply with the applicable data protection laws and regulations, in particular the GDPR with regard to the collection, storage, use, and disclosure of any personal or sensitive information and data they collect, use, or otherwise access in connection with the Services, and shall oblige their personnel to observe those data secrecy requirements pursuant to the relevant applicable laws and regulations. Legitimate data protection obligations of LinkPro LLC and you pertaining to possible commissioned data processing are set forth by the data processing agreement in accordance with Art. 28 GDPR, which forms an integral part of these Terms and Conditions. The statutory and applicable data protection provisions, in particular Art. 82 GDPR, apply in the event of compensation of liability claims.
                                </p>
                                <h4 className="sub_title">3.6 Feedback</h4>
                                <p>
                                    If you (including your End Users) provide Feedback to LinkPro LLC, then you grant us a worldwide, royalty-free, transferable, irrevocable, and perpetual license to make, use, sell, have made, offer to sell, import, reproduce, publicly display, distribute, modify, or publicly perform the Feedback in any manner without any obligation, royalty, or restriction based on IP rights or otherwise.
                                </p>
                                <h4 className="sub_title">3.7 Your Responsibilities</h4>
                                <p>
                                    You shall:
                                </p>
                                <div className="indent">
                                    <p>
                                        (i) Be responsible for your (including your End Users) compliance with these Terms and Conditions and for any activities that occur under your account;
                                    </p>
                                    <p>
                                        (ii) Be responsible for the accuracy, quality, and legality of Your Data and of the means by which you acquired Your Data;
                                    </p>
                                    <p>
                                        (iii) Use commercially reasonable efforts to prevent unauthorized access to or use of the Services, as well as security breaches, and notify LinkPro LLC promptly of these incidents. Furthermore, in the event that Users discover any such unauthorized use or access, Users shall immediately stop the unauthorized use or access. Users acknowledge and agree that in such cases, LinkPro LLC may seek injunctive relief and any other remedies that may be available to it at law, in equity, or by statute;
                                    </p>
                                    <p>
                                        (iv) Use the Services only in accordance with these Terms and Conditions as well as applicable laws, ordinances, and regulations;
                                    </p>
                                    <p>
                                        (v) Implement, maintain, and update all necessary and proper procedures and software for safeguarding against Malicious Code and other code that manifests contaminating or destructive properties;
                                    </p>
                                    <p>
                                        (vi) Comply with our Privacy Policy; and
                                    </p>
                                    <p>
                                        (vii) Be solely responsible for adequate security protection and backup of Your Data, User Content, and/or equipment used in connection of the Services.
                                    </p>
                                    <p>
                                        Except as expressly authorized herein, you shall not:
                                    </p>
                                    <p>
                                        (i) Permit any third party to access the Services except as permitted by these Terms and Conditions or in an Order Form;
                                    </p>
                                    <p>
                                        (ii) Upload, post, reproduce, translate, or distribute any data or material protected by privacy rights without first obtaining the permission of the owner of such rights;
                                    </p>
                                    <p>
                                        (iii) Sell, resell, translate, rent, or lease the Services;
                                    </p>
                                    <p>
                                        (iv) Modify, alter, or create derivative works based on the Services;
                                    </p>
                                    <p>
                                        (v) Copy, frame, or mirror any part or content of the Services;
                                    </p>
                                    <p>
                                        (vi) Reverse engineer the Services except to the extent permitted herein and in accordance with law;
                                    </p>
                                    <p>
                                        (vii) Access the Services in order to:
                                    </p>
                                    <div className="indent">
                                        <p>
                                            a) Build a competitive product or service, or
                                        </p>
                                        <p>
                                            b) Copy any features, functions, or graphics of the Services;
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    (viii) Use the Services to store or transmit infringing, libelous, or otherwise unlawful or tortious material, or to store or transmit material in violation of third-party privacy rights;
                                </p>
                                <p>
                                    (ix) Use the Services to store or transmit Malicious Code;
                                </p>
                                <p>
                                    (x) Use the Services for fraudulent purposes or impersonate any individuals or entities;
                                </p>
                                <p>
                                    (xi) Interfere with or disrupt the integrity or performance of the Services or third-party data contained therein;
                                </p>
                                <p>
                                    (xii) Attempt to gain unauthorized access to the Services or their related systems or networks; and
                                </p>
                                <p>
                                    (xiii) Use the Services in violation of any applicable laws and regulations.
                                </p>
                                <h4 className="title">4. THIRD PARTY SERVICES</h4>
                                <p>
                                    From time to time, we may as part of or ancillary to the Services, provide you access to Third Party services. The Website and our other Services may include links to Third Parties’ websites and services. These links are provided for your convenience only and do not signify that we endorse such Third Parties’ websites or services. We do not review such Third Party’s websites and you acknowledge and agree that: (a) We are not responsible for such websites, including the terms on which such websites are made available and the privacy policies of such websites, and do not control their content or availability; (b) we make no representation, warranty or condition, either express or implied, in relation to any services or information received from such websites; and (c) if you access any such websites, you do so entirely at your own risk. Any acquisition by you of such Third Parties’ services, and any exchange of data between you and such Third Party, is solely between you and the applicable Third Party. LinkPro LLC does not warrant or support Third Party products or services, whether or not they are designated by LinkPro LLC as “certified” or otherwise, except as specified in an Order Form. We shall not be responsible for any disclosure, modification, or deletion of Your Data or User Content resulting from your use of such Third Parties’ website or services. If the Third Parties’ services cease to interoperate with the corresponding LinkPro LLC Services on reasonable terms, LinkPro LLC may cease providing such Service features without providing any refund, credit, or other compensation to you.
                                </p>
                                <h4 className="title text-decoration-underline">5. FEES AND PAYMENT FOR PRO PLANS AND PREMIER PLANS</h4>
                                <h4 className="sub_title">5.1 Fees</h4>
                                <p>
                                    Users shall pay all fees specified in the applicable Order Form(s). Except as otherwise specified:
                                </p>
                                <p>
                                    (i) Fees are based on Services purchased and not actual usage; and
                                </p>
                                <p>
                                    (ii) Payment obligations are non-cancelable, and fees paid are non-refundable except as expressly provided under the Termination for Cause Section.
                                </p>
                                <h4 className="sub_title">5.2 Payment</h4>
                                <p>
                                    Payment for Pro Plans and Premier Plans shall be made in advance and shall renew automatically unless canceled by Users at least one (1) day prior to the term. Excluding one-time discounts and promotional pricing, our price increase will not exceed one-hundred (100) percent. Users are responsible for providing complete and accurate billing and contact information to LinkPro LLC and for updating their accounts if such information changes. A Pro Plan or Premier Plan canceled by a User will automatically convert to a Free Plan unless you request the deletion of your account.
                                </p>
                                <h4 className="sub_title">5.3 Overdue Charges and Suspension of Service</h4>
                                <p>
                                    If Pro Plans or Premier Plans are not canceled as above and payments are not received by the due date, (a) the unpaid balance may accrue interest at the rate of one and a half percent (1.5%) of the outstanding balance per month, or the maximum rate permitted by law, whichever is higher, from the date such payment was due until the date paid; and/or (b) we may condition future Service renewals and Order Form(s) on different payment terms than those specified above. If any amount owed by Users exceeds (X) days overdue, LinkPro LLC may, without limiting our other rights and remedies, accelerate your unpaid fee obligations so that all of your fee obligations become immediately due and payable. We may suspend the Services (including those under the Pro Plan and Premier Plan) to you until such amounts are paid in full.
                                </p>
                                <h4 className="sub_title">5.4 Taxes</h4>
                                <p>
                                    Unless otherwise stated, the Service fees do not include any taxes, levies, duties, or similar governmental assessments of any nature, including, but not limited to, value-added, sales, use, or withholding taxes, assessable by any local, state, provincial, federal, or foreign jurisdiction (collectively "Taxes"). Users are responsible for paying all Taxes associated with your purchases of the Services. If LinkPro LLC has the legal obligation to pay or collect Taxes for which Users are responsible under this paragraph, the appropriate amount shall be paid by you, unless you have provided LinkPro LLC with a valid tax exemption certificate authorized by the appropriate taxing authority.
                                </p>
                                <h4 className="title text-decoration-underline">6. CONFIDENTIALITY</h4>
                                <h4 className="sub_title">6.1 Definition of Confidential Information</h4>
                                <p>
                                    (i) As used in these Terms and Conditions, "Confidential Information" includes all confidential and proprietary information disclosed by LinkPro LLC ("Disclosing Party") to you ("Receiving Party"), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information shall include, but is not limited to, our Services, OrderForm(s), business and marketing plans, technology and technical information, product plans and designs, and business processes disclosed by LinkPro LLC or acquired by You while using our Services.
                                </p>
                                <p>
                                    (ii) Confidential Information (other than Your Data) shall not include any information that:
                                </p>
                                <div className="indent">
                                    <p>
                                        a) Is or becomes generally known to the public without breach of any obligation owed to the Disclosing Party;
                                    </p>
                                    <p>
                                        b) Was known to the Receiving Party prior to its disclosure by the Disclosing Party without breach of any obligation owed to the Disclosing Party;
                                    </p>
                                    <p>
                                        c) Was received from a third party without breach of any obligation owed to the Disclosing Party; or
                                    </p>
                                    <p>
                                        d) Was independently developed by the Receiving Party.
                                    </p>
                                </div>
                                <h4 className="sub_title">6.2 Protection of Confidential Information</h4>
                                <p>
                                    The Receiving Party shall use the same degree of care that it uses to protect the confidentiality of its own confidential and proprietary information of like kind (but in no event less than reasonable care) and hereby agrees:
                                </p>
                                <p>
                                    (iii) To keep strictly confidential and take reasonable precautions to protect against the unauthorized access, use or disclosure of all Confidential Information;
                                </p>
                                <p>
                                    (iv) Electronic data format Confidential Information shall be maintained and secured using security measures that meet information security controls standards; and
                                </p>
                                <p>
                                    (v) Not to use any Confidential Information of the Disclosing Party for any purpose outside the scope of these Terms and Conditions.
                                </p>
                                <h4 className="sub_title">6.3 Compelled Disclosure</h4>
                                <p>
                                    The Receiving Party may disclose Confidential Information of the Disclosing Party if it is compelled by law to do so, provided the Receiving Party promptly gives the Disclosing Party prior notice of such compelled disclosure (to the extent legally permitted) and reasonable assistance, at the Disclosing Party's cost, if the Disclosing Party wishes to contest the disclosure. If the Receiving Party is compelled by law to disclose the Disclosing Party’s Confidential Information as part of a civil proceeding to which the Disclosing Party is a party, and the Disclosing Party is not contesting the disclosure, the Disclosing Party will reimburse the Receiving Party for its reasonable cost of compiling and providing secure access to such Confidential Information. LinkPro LLC and you shall cooperate in seeking reasonable protective arrangements before the Confidential Information is produced.
                                </p>
                                <h4 className="title text-decoration-underline">7. WARRANTIES AND DISCLAIMERS</h4>
                                <h4 className="sub_title">7.1 Our Warranties</h4>
                                <p>
                                    TO THE EXTENT LEGALLY PERMITTED, THE SERVICES ARE PROVIDED “AS-IS” WITHOUT WARRANTY OF ANY KIND. LINKPRO LLC DISCLAIMS ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, CORRESPONDENCE TO DESCRIPTION, NON-INFRINGEMENT, COURSE OF PERFORMANCE, OR FITNESS FOR A PARTICULAR PURPOSE. WE GIVE NO WARRANTY: (A) THAT ACCESS TO THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE; (B) THAT THE WEBSITE AND/OR THE COMPUTER SERVER FROM WHICH THE SERVICES ARE MADE AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (C) AS TO THE ACCURACY, CONTENT, TIMELINESS, COMPLETENESS, RELIABILITY, QUALITY, OR SUITABILITY OF ANY CONTENT CONTAINED IN OR DELIVERED VIA THE WEBSITE OR OTHERWISE MADE AVAILABLE IN CONNECTION WITH THE SERVICES. YOU ALSO ACKNOWLEDGE AND AGREE THAT THE OPERATION OF THE WEBSITE IS DEPENDENT UPON THE PROPER AND EFFECTIVE FUNCTIONING OF THE INTERNET AND OTHER THIRD-PARTY EQUIPMENT AND SERVICES, AND THAT WE DO NOT GUARANTEE AND WILL NOT BE LIABLE FOR THESE IN ANY WAY.
                                </p>
                                <h4 className="sub_title">7.2 Your Warranty</h4>
                                <p>
                                    You warrant that you have validly accepted these Terms and Conditions and any obligations contained in the Privacy Policy and have the legal capacity and authority to do so.
                                </p>
                                <h4 className="sub_title">7.3 Disclaimer</h4>
                                <p>
                                    EXCEPT AS EXPRESSLY PROVIDED, NEITHER PARTY MAKES ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, AND EACH PARTY SPECIFICALLY DISCLAIMS ALL THE SECTION ABOVE, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.
                                </p>
                                <h4 className="sub_title">7.4 Services in Development</h4>
                                <p>
                                    SERVICES IN DEVELOPMENT ARE NOT CONSIDERED AS "SERVICES” UNDER THESE TERMS & CONDITIONS AND ARE PROVIDED "AS IS" WITH NO EXPRESS OR IMPLIED WARRANTY.
                                </p>
                                <p>
                                    In addition, from time to time we may invite you to try LinkPro LLC’s products or services in development that are not generally available to Users. You may accept or decline any such trial at your sole discretion. Any Services in development may contain bugs or errors, and Users acknowledge that LinkPro LLC has no obligation to make any Services in development generally available to its Users.
                                </p>
                                <h4 className="title text-decoration-underline">8. INDEMNIFICATION</h4>
                                <p>
                                    You shall defend LinkPro LLC against (i) any loss suffered as a result of your breach of these Terms and Conditions, or (ii) any claim, demand, suit, or proceeding made or brought against LinkPro LLC by a third party (including End Users) alleging that your (including your End Users) Data, User Content, Feedback, or your (including your End Users) use of the Services infringes or misappropriates the intellectual property rights of a third party or violates applicable law, and shall indemnify LinkPro LLC for any damages, attorney’s fees and costs finally awarded against LinkPro LLC as a result, or for any amounts paid by LinkPro LLC. Without limiting or otherwise abrogating your other obligations stated herein, you shall, at it’s your own expense, defend, indemnify, and hold LinkPro LLC harmless from and against any and all damage, loss, expense, claim, lawsuit, judgment, and/or other liability (including without limitation attorney’s fees or court costs) arising from your failure to protect the proprietary, confidential, and/or personal information of third parties. LinkPro LLC shall have the right but not the obligation to participate in defending against such claim.
                                </p>
                                <p>
                                    The foregoing shall apply to the extent permitted by applicable laws and regulations.
                                </p>
                                <h4 className="title text-decoration-underline">9. LIMITATION OF LIABILITY</h4>
                                <h4 className="sub_title">9.1 Limitation of Liability</h4>
                                <p>
                                    In no event shall LinkPro LLC or its licensors or agents be liable, whether in an action under contract, negligence, or any other theory, arising out of or in connection with the use, inability to use, or performance of the information, services, products, and materials available from the Website or through our other Services, shall exceed (i) the price paid or payable by you for the Services or (ii) a maximum liability limitation of $100 in the aggregate, whichever is greater. You and we agree that this is a fair allocation of risk based upon the manner and cost by which the Services are provided to you, and taking into account your ability to take other measures or to consult other resources in connection with purchasing services online, even if we have been previously advised of the possibility of such damages. You agree that we will not be liable for any damages suffered as a result of using the Services, or copying, distributing, or downloading contents from the Website or Services. These limitations shall apply notwithstanding to any failure of essential purpose of any limited remedy.
                                </p>
                                <h4 className="sub_title">9.2 Exclusion of Consequential and Related Damages</h4>
                                <p>
                                    IN NO EVENT SHALL EITHER PARTY HAVE ANY LIABILITY TO THE OTHER PARTY FOR ANY LOST PROFITS OR REVENUES OR FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, COVER, OR PUNITIVE DAMAGES HOWEVER CAUSED, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, AND WHETHER OR NOT THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, INCLUDING, BUT NOT LIMITED TO: (A) ANY DAMAGES CAUSED BY YOUR FAILURE OR THAT OF YOUR END USERS, (B) ANY CLAIMS OR DEMANDS OF THIRD PARTIES (EXCEPT AS PROVIDED IN THE INDEMNIFICATION SECTION; OR (C) ANY LOST PROFITS, LOSS OF BUSINESS, BUSINESS INTERRUPTION, COST OF COVER, LOSS OF USE, LOSS OF DATA, LOST SAVINGS, OR OTHER CONSEQUENTIAL, SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY, OR PUNITIVE DAMAGES OF ANY KIND IN CONNECTION WITH OR ARISING OUT OF THE FURNISHING, PERFORMANCE, OR USE OF THE SERVICES WHETHER ALLEGED AS A BREACH OF CONTRACT OR TORTIOUS CONDUCT, INCLUDING NEGLIGENCE.
                                </p>
                                <p>
                                    THIS LIMITATION APPLIES TO LINKPRO LLC AND ANY PERSON OR ENTITY INVOLVED IN THE CREATION, MANUFACTURE OR DISTRIBUTION OF ANY SOFTWARE, SERVICES OR OTHER MATERIALS PURSUANT TO THE PROVISION OF THE SERVICES.
                                </p>
                                <p>
                                    THE FOREGOING DISCLAIMER SHALL APPLY TO THE EXTENT LEGALLY PERMITTED.
                                </p>
                                <h4 className="title text-decoration-underline">10. TERMINATION</h4>
                                <h4 className="sub_title">10.1 Termination for Cause</h4>
                                <p>
                                    You may terminate for cause upon thirty (30) days’ prior written notice to LinkPro LLC of a material breach if such breach remains uncured at the expiration of such period. In no event shall any termination relieve you of the obligation to pay any fees payable to LinkPro LLC for any period prior to the effective date of termination.
                                </p>
                                <h4 className="sub_title">10.2 Surviving Provisions</h4>
                                <p>
                                    Rights and obligations which, by their nature, would continue beyond the termination of this Agreement shall survive such termination, including the rights and obligations created by the following clauses: Fees and Payment for Enhanced Plans, Order Forms and Services, Confidentiality, Disclaimer, Indemnification, Limitation of Liability, Governing Law and Jurisdiction, and General Provisions.
                                </p>
                                <h4 className="sub_title">11. GOVERNING LAW AND JURISDICTION</h4>
                                <p>
                                    Without regard to choice or conflicts of law rules, you and LinkPro LLC agree that Missouri state laws and the applicable federal laws of the United States shall apply in any lawsuit arising out of or in connection with your use of the Services. If specific laws and regulations contrary to these Terms and Conditions apply to you considering your domicile, said laws and regulations shall prevail to the extent of the inconsistency. You and LinkPro LLC agree to the exclusive jurisdiction of the courts in Saint Louis County Missouri, United States.
                                </p>
                                <h4 className="title text-decoration-underline">12. GENERAL PROVISIONS</h4>
                                <h4 className="sub_title">12.1 Export Compliance</h4>
                                <p>
                                    The Services, and any derivative content and technology we make available to you, may be subject to export laws and regulations of the United States and other jurisdictions. You represent that you are not named on any U.S. government denied party list. You shall not permit End Users to use any Services or related content in a U.S. embargoed country (Cuba, Iran, North Korea, Sudan or Syria as of August 5, 2021) or in violation of any U.S. export law or regulation.
                                </p>
                                <h4 className="sub_title">12.2 Assignment</h4>
                                <p>
                                    Except as expressly authorized herein, you may not assign any of its rights or obligations under these Terms and Conditions, whether by operation of law or otherwise, without our prior written consent. Subject to the foregoing, this Agreement will bind and inure to the benefit of the parties, their respective successors and permitted assigns. You agree that this Agreement may be assigned in our sole discretion to a third party in the event of a merger or acquisition of LinkPro LLC.
                                </p>
                                <h4 className="sub_title">12.3 Relationship</h4>
                                <p>
                                    Neither party will have the authority to, and will not, act as agent for or on behalf of the other party or represent or bind the other party in any manner. No agency or employment relationship between you and LinkPro LLC is created by virtue of these Terms and Conditions.
                                </p>
                                <h4 className="sub_title">12.4 Third Party Beneficiaries</h4>
                                <p>
                                    LinkPro LLC’s licensors shall have the benefit of the protections and rights reserved herein with respect to the Services and related content. No other third-party beneficiaries are contemplated under these Terms and Conditions, and therefore none exist.
                                </p>
                                <h4 className="sub_title">12.5 Force Majeure</h4>
                                <p>
                                    LinkPro LLC will not be deemed in default of any provision of these Terms and Conditions or otherwise be held liable for any delay in or failure of its performance under these Terms and Conditions if such delay or failure arises due to any event beyond its reasonable control, including without limitation acts of God, malicious or criminal acts, acts of the common enemy, weather conditions, earthquakes, floods, fires, labor disputes, changes in law, regulation or government policy, war, epidemics, riots, failures, difficulties or delays in transportation or communications, acts or omissions of vendors or suppliers, equipment failures, or any act or failure to act by the Customer, its employees, agents or contractors. LinkPro LLC is not liable for excusable delay.
                                </p>
                                <h4 className="sub_title">12.6 No Waiver</h4>
                                <p>
                                    No failure, neglect, or delay on our part in exercising any rights or remedies under this Agreement shall operate as a waiver thereof, nor shall any single or partial exercise of any right or remedies preclude any other or further exercise of the same or of any rights or remedies, nor shall any waiver of any rights or remedies with respect to any occurrence be construed as a waiver of such rights or remedies in the future. LinkPro LLC will solely waive its rights or remedies under this Agreement by executing a waiver.
                                </p>
                                <h4 className="sub_title">12.7 Severability</h4>
                                <p>
                                    In the event that a court of competent jurisdiction holds that a particular provision or requirement of these Terms and Conditions is in violation of any applicable law, each such provision or requirement shall be enforced only to the extent it is not in violation of such law or is not otherwise unenforceable and all other provisions and requirements contained in these Terms and Conditions shall remain in full force and effect.
                                </p>
                                <h4 className="sub_title">12.8 Attorney’s Fees.</h4>
                                <p>
                                    You agree to pay any and all reasonable attorney’s fees and/or collection costs incurred by LinkPro LLC in order to collect any fees or charges due following User’s breach of the Payment section, including litigation expenses incurred in any legal proceedings.
                                </p>
                        </div>
                    </div>
                )
            case "privacy":
                return (
                    <div className="card guest">
                        <div className="card-body">
                            <h2 className="page_title">Privacy Policy</h2>
                            <p>
                                LinkPro LLC (hereinafter “LinkPro”, "we", "our", or "us") is committed to protecting the privacy of all the individuals accessing and using its website at
                                <Link className="text-decoration-underline" href={route('home')}> {route('home')}</Link> (hereinafter "Website"). This Data Privacy Policy describes how we collect, use, disclose, and transfer the personal information* that our Visitors and Users (as defined under our Terms and Conditions,
                                <Link className="text-decoration-underline" href={route('terms')}> {route('terms')}</Link>) provide to us or that we collect about them when they access and/or use our Website. This Data Privacy Policy is about LinkPro’s collection and use of its Website’s Users’ and Visitors’ personal data only. End Users (as defined under our
                                <Link className="text-decoration-underline" href={route('terms')}> Terms and Conditions</Link> should directly contact the Users if they have questions about their personal data collection by the Users.
                            </p>
                            <p>
                                By accessing and using our Website, you agree to the collection and use of your personal information and other information in accordance with this Policy. When you provide your personal information to us, you accept that we may retain it and that it may be held by us or any third party that processes it on our behalf for the purposes of providing the information or services which you have requested. Any third parties who process personal information on our behalf are required to maintain the confidentiality and privacy of the personal information that they process for us. However, we cannot control said third parties’ privacy and security policies, such that you agree that LinkPro shall not be liable for any security breach or negligence or other liability arising from said third parties’ acts and omissions.
                            </p>
                            <p>
                                LinkPro supports the Children's Online Privacy Protection Act and other frameworks like the General Data Protection Regulation and the UK’s version of the EU’s GDPR. Children under the age of 13 are not authorized to access and use our Website. Upon knowledge, we will take reasonable efforts to ensure that any information provided by all children under the age of 13 or their guardian/parent is erased or destroyed. For children between 13 and 17 years of age, pursuant to our
                                <Link className="text-decoration-underline" href={ route('terms') }> Terms and Conditions</Link>, they must obtain the consent of their parent/guardian. Upon knowledge of their failure to do so, we will take reasonable efforts to erase or destroy their data collected or stored by LinkPro.
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
                            <p className="blue_text bold_text">HOW WE COLLECT YOUR PERSONAL DATA</p>
                            <p>
                                <span className="blue_text bold_text">Visitors and Users.</span> We collect information from visitors through the use of online forms and every time you e-mail us your details. If you register with us and create an account (either Pro Plan or Corporate Plan) on the Website, during the registration process you will be asked to submit personal information about yourself (such as your name, address, email address, phone number, billing information*). We may also collect personal information from you when you correspond with us (for example, when you send us e-mail communications, letters, or otherwise make inquiries about your account), when you respond to our surveys, or when you comment on our Website or other forums.
                            </p>
                            <p>
                                <small>
                                    * “<span className="bold_text">Personal information/data</span>” means any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.
                                    * Payment information is solely collected and processed by Braintree Gateway.
                                </small>
                            </p>
                            <p>
                                <span className="blue_text bold_text">Cookies.</span> Some of our web pages use cookies (text files that are stored on your computer and saved by your browser). Cookies should not harm your computer and should not contain any viruses. We use cookies because cookies help make our website more user-friendly, efficient, and secure. Most of the cookies we use are so-called "session cookies." They are automatically deleted after your visit. Other cookies remain in your device's memory until you delete them. These cookies make it possible to recognize your browser when you next visit the Website.
                                <br/>
                                You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of our Website and other services. Some cookies, which are necessary to allow electronic communications or to provide certain functions you wish to use, are stored pursuant to applicable laws and regulations. We have a legitimate interest in the storage of cookies to ensure an optimized service provided free of technical errors and with contents corresponding to your interests.
                            </p>
                            <p>
                                <span className="blue_text bold_text">Server log files.</span> We automatically collect and store information that your browser automatically transmits to us in "server log files." These include, but may not be limited to:
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
                            <p className="blue_text bold_text">
                                Analytics and Advertising
                            </p>
                            <p>
                                <span className="blue_text text-decoration-underline bold_text">Google Services.</span> Our Website may use various Google Services, provided or operated by the following responsible party:
                                <br/>
                                If you are located within the EU or Switzerland, the party(s) responsible for the services provided is Google Ireland Limited (“Google”), Gordon House, Barrow Street, Dublin 4, Ireland.
                                <br/>
                                If you are located outside the EU, the party responsible for the services provided is Google LLC (“Google”), 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
                                <br/>
                                <span className="blue_text">Google Analytics.</span> Our Website may use Google Analytics, a web analytics service. Google Analytics uses cookies. The information generated by the cookie about your use of this Website is usually transmitted to a Google server in the USA and stored there. We analyze user behavior to optimize both the Website and for advertising purposes. You can prevent the collection of your data by Google Analytics by clicking on the following link. An opt-out cookie will be set to prevent your data from being collected on future visits to this site: Disable Google Analytics. For more information about how Google Analytics handles user data, the “Safeguarding your data” article in conjunction with the Google Privacy Policy at
                                <a className="blue_text text-decoration-underline" href="https://support.google.com/analytics/answer/6004245?hl=en">https://support.google.com/analytics/answer/6004245?hl=en</a>.
                                <br/>
                                <span className="blue_text">Google Adwords.</span> Our Website may use Google AdWords, an online advertising program which uses cookies. If you do not want to participate in Google Adwords, you can opt out of this easily by disabling the Google Adwords cookie in your browser settings. We analyze user behavior through Google AdWords to both optimize our Website and for advertising purposes. For more information about Google AdWords, see the Google Privacy Policy:
                                <a className="blue_text text-decoration-underline" href="https://www.google.de/policies/privacy/">https://www.google.de/policies/privacy/</a>.
                                <br/>
                                You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of our Website.
                                <br/>
                                <span className="blue_text">Google Analytics Remarketing.</span> Our Websites may use the features of Google Analytics Remarketing. This feature makes it possible to link target audiences for promotional marketing created with Google Analytics Remarketing to the cross-device capabilities of Google AdWords and Google DoubleClick. This allows advertising to be displayed based on your personal interests, identified based on your previous usage and surfing behavior on one device (e.g. your mobile phone), on other devices (such as a tablet or computer).
                                <br/>
                                Once you have given your consent, Google will associate your web and app browsing history with your Google Account for this purpose. That way, any device that signs in to your Google Account can use the same personalized promotional messaging.
                                <br/>
                                To support this feature, Google Analytics collects Google-authenticated IDs of users that are temporarily linked to our Google Analytics data to define and create audiences for cross-device ad promotion. We analyze anonymous user behavior for advertising purposes.
                                <br/>
                                You can permanently opt out of cross-device remarketing/targeting by turning off personalized advertising in your Google Account; follow this link:
                                <a className="blue_text text-decoration-underline" href="https://www.google.com/settings/ads/onweb/">https://www.google.com/settings/ads/onweb/</a>. for more information about Google Analytics Remarketing, go to:
                                <a className="blue_text text-decoration-underline" href="https://www.google.com/policies/technologies/ads/">https://www.google.com/policies/technologies/ads/</a>.
                                <span className="blue_text">Google Conversion Tracking.</span> Our Website may use Google Conversion Tracking. When you click on an ad served by Google, a conversion tracking cookie is set. Cookies are small text files that your internet browser stores on your computer. These cookies expire after 30 days and are not used for personal identification of the user. Should the user visit certain pages of the Website and the cookie has not yet expired, Google and the Website can tell that the user clicked on the ad and proceeded to that page. The information obtained using the conversion cookie is used to create conversion statistics for the AdWords advertisers who have opted for conversion tracking. Customers are told the total number of users who clicked on their ad and were redirected to a conversion tracking tag page. However, advertisers do not obtain any information that can be used to personally identify users. We analyze user behavior to optimize both our Website and for advertising purposes. If you do not want to participate in tracking, you can opt-out of this by easily disabling the Google Conversion Tracking cookie by changing your browser settings. In doing so, you will not be included in the conversion tracking statistics.
                                <br/>
                                You can configure your browser to inform you about the use of cookies so that you can decide on a case-by-case basis whether to accept or reject a cookie. Alternatively, your browser can be configured to automatically accept cookies under certain conditions or to always reject them, or to automatically delete cookies when closing your browser. Disabling cookies may limit the functionality of the Website.
                                <br/>
                                For more information about Google Conversion Tracking, see the Google Privacy Policy at https://www.google.de/policies/privacy/.
                            </p>
                            <p>
                                <span className="blue_text text-decoration-underline bold_text">Facebook.</span> Our Website may use Facebook remarketing ads, an interest-based advertising service provided by Facebook Inc. We analyze user behavior through Facebook to both optimize our Website and for advertising purposes. You can elect to op-out of this service by following the instructions at
                                <a className="blue_text text-decoration-underline" href="https://www.facebook.com/help/568137493302217">https://www.facebook.com/help/568137493302217</a>. For more information about Facebook remarketing ads and your data collection, see the following articles:
                                <a className="blue_text text-decoration-underline" href="https://www.facebook.com/help/516147308587266/how-ads-work-on-facebook/?helpref=hc_fnav">https://www.facebook.com/help/516147308587266/how-ads-work-on-facebook/?helpref=hc_fnav</a>
                                <a className="blue_text text-decoration-underline" href="https://www.facebook.com/privacy/explanation">https://www.facebook.com/privacy/explanation</a>
                            </p>
                            <p>
                                <span className="blue_text bold_text">PURPOSE OF COLLECTING YOUR PERSONAL DATA</span>
                                <br/>
                                We will collect your personal data if (i) there’s a legitimate interest, (ii) we receive your consent, (iii) it is necessary to perform our contractual obligations, or (iv) it is required to comply with applicable laws and regulations. Specifically, we may collect your personal data to:
                                <br/>
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
                                <br/>
                                <span className="blue_text bold_text">DATA RETENTION</span>
                                <br/>
                                We will store your personal data as long as necessary to fulfill the aforementioned purposes and until required by applicable laws and regulations.
                            </p>
                            <p>
                                <span className="blue_text bold_text">DATA PROTECTION</span>
                                <br/>
                                Given that the Internet is a global environment, using the Internet to collect and process personal information necessarily involves the transmission of data on an international basis. Therefore, by browsing the Website and communicating electronically with us, you acknowledge our processing of personal information in this way. We will endeavor to protect all personal information collected through the Website in accordance with applicable industry standards. We have implemented adequate safeguard measures per the industry standards as well as applicable laws and regulations to protect your personal data, such as contracting with a PCI-DSS compliant vendor to process Users’ payments, limiting access or disclosing your personal information only to our staff, agents, law enforcement authorities, contractors, other business partners, and future assignees/subsidiaries/affiliates/successors.
                            </p>
                            <p>
                                <span className="blue_text bold_text">THIRD-PARTY PAYMENT PROCESSOR</span>
                                <br/>
                                Users’ payment information is directly provided to Braintree Gateway and the collection and use of your personal data are subject to Braintree Gateway Services Agreement and Data Privacy Policy available at:
                                <a href="https://www.braintreepayments.com/legal/braintree-privacy-policy">(https://www.braintreepayments.com/legal/braintree-privacy-policy)</a>
                            </p>
                            <p>
                                <span className="blue_text bold_text">OTHER WEBSITES</span>
                                <br/>
                                The Website may contain links to other websites which are outside our control and are not covered by this Data Privacy Policy. If you access other sites using the links provided, the operators of these sites may collect information from you which will be used by them in accordance with their data privacy policy, which may differ from ours.
                            </p>
                            <p>
                                <span className="blue_text bold_text">EXERCISE YOUR  RIGHTS REGARDING YOUR PERSONAL DATA</span>
                                <br/>
                                You always have the right to request information about your stored personal data, its origin, its recipients,
                                and the purpose of its collection. You also have the right to request that your personal data be corrected, blocked, or deleted. Your rights will also depend on the applicable laws and regulations. For instance, if the General Data Protection Regulation applies, you are also entitled to the right: i) to consent; ii) to be forgotten; iii) to be informed; iii) to have access to your data; (iv) to modify your data; and (v) to data portability.
                            </p>
                            <p>
                                To obtain a copy of the personal information we hold about you, please contact us at support@link.pro. For mail delivery, please note that we are entitled to charge a small fee of $9.99 for providing you with copies of personal information that we may hold about you. You can contact us at any time if you have further questions, need more information about the issue of privacy and data protection, or for complaints or withdrawal of your consent at support@link.pro.
                            </p>
                            <p>
                                <span className="blue_text bold_text">OPPOSITION TO UNSOLICITED EMAIL</span>
                                <br/>
                                We hereby expressly prohibit the use of the contact information herein to send us promotional and informational materials not expressly requested. We reserve the right to take specific legal action if unsolicited advertising material, such as email spam, is received.
                            </p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="container">
            <div className="my_row terms form_page">
                {switchStatement()}
            </div>
        </div>
    );
};

export default PageContent;
