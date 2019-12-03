#-*- coding: utf-8 -*-
__author__ = 'aditya'


from b2c_app import app
from flask import render_template, request, make_response, jsonify, abort, redirect, session, Response
import requests
from Crypto.Cipher import AES
import base64
import binascii
import datetime
import json


app.secret_key = "partner data session secret key"



#======================== HOTEL B2C============================


@app.route('/', methods=['GET'])
def hotel_home():
    return render_template('hotel/b2c_hotels/holidays.html')


@app.route('/hotel', methods=['GET'])
def hotel():
    return render_template('hotel/b2c_hotels/hotel.html')

@app.route('/flight')
def flight():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/cabs')
def cabs():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/experience')
def activities():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/holidays')
def holidays():
    return render_template('hotel/b2c_hotels/holidays.html')

@app.route('/visa/coming-soon')
def visa_soon():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/buses')
def buses():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/events')
def events():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/bus')
def bus():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/forex')
def forex():
    return render_template('hotel/b2c_hotels/coming-soon.html')

@app.route('/hotel/list', methods=['GET'])
def hotel_list():
    return render_template('hotel/b2c_hotels/hotel_list.html')

@app.route('/signup')
def signup():
    return render_template('hotel/b2c_hotels/register.html')

@app.route('/login')
def login():
    return render_template('hotel/b2c_hotels/login.html')


@app.route('/hotel/<string:slug>', methods=['GET'])
def hotel_detail(slug):
    hotel_api_url = str(app.config["API_URL"]) + "/api/v1/hotel"
    hotel_data = requests.get(url=hotel_api_url, params={"slug": slug}).json()
    if len(hotel_data["result"]["hotel"]) > 0:
        hotel_data = hotel_data["result"]["hotel"][0]
    else:
        hotel_data = {}
    return render_template('hotel/b2c_hotels/hotel_detail.html', hotel_data=hotel_data)


#================= Admin hotels ==========================


# @app.route('/admin/hotel', methods=['GET'])
# def admin():
#     if request.cookies.get("hash2"):
#         php_url = str(app.config["ADMIN_API_URL"]) + "/api/v1/admin.php"
#         AES.key_size = 128
#         iv = "DEFGHTABCIESPQXO"
#         key = "pqrstuvwxyz$abcdefghijAB12345678"
#         crypt_object = AES.new(key=key, mode=AES.MODE_CBC, IV=iv)
#         decoded = binascii.unhexlify(str(request.cookies["hash2"]))  # your ecrypted and encoded text goes here
#         decrypted = crypt_object.decrypt(decoded)
#         unpad = lambda s: s[:-ord(s[len(s) - 1:])]
#         username = unpad(decrypted).decode('utf-8')
#         print(username, "username")
#         admin_data = requests.get(url=php_url, params={"username": username}).json()
#         print(admin_data, "admindata")
#         if admin_data.get("error"):
#             print("errroooooorr")
#             return redirect(str(app.config["ADMIN_DOMAIN_URL"]), code=302)
#         else:
#             session["partner_data"] = admin_data
#         return render_template('hotel/admin/admin_hotel.html', name=admin_data["name"])
#     else:
#         print("hashnotfount")
#         return redirect(str(app.config["ADMIN_DOMAIN_URL"]), code=302)
#
#
# @app.route('/admin/update', methods=['GET'])
# def admin_hotel_update():
#     return render_template('hotel/admin/hotel_update.html')
#
#
# @app.route('/admin/deals', methods=['GET'])
# def admin_hotel_deals():
#     return render_template('hotel/admin/deals.html')


# #================= Booking hotels ==========================
#
#
# @app.route('/hotel/booking', methods=['GET'])
# def booking():
#     if 'partner_data' in session:
#         partner_data = session["partner_data"]
#         if partner_data["status"] == 'Approved':
#             return render_template('hotel/booking/booking.html', partner_data=partner_data)
#         else:
#             return "YOU ARE NOT APPROVED FOR BOOKING  <br><a href =" + str(app.config["DOMAIN_URL"]) +  "/lta-registration.php'></b>" + \
#            "click here  FOR THE APPROVAL </b></a>"
#     else:
#         return redirect(str(app.config["PARTNER_DOMAIN_URL"]) + '/login.php', code=302)
#
#

#================= Destination Pages ==========================


@app.route('/destinations/maldives')
def destinations_maldive():
    return render_template('/hotel/b2c_hotels/destinations/maldives.html')


@app.route('/destinations/bali')
def destinations_bali():
    return render_template('/hotel/b2c_hotels/destinations/bali.html')


@app.route('/destinations/bangkok')
def destinations_bangkok():
    return render_template('/hotel/b2c_hotels/destinations/bangkok.html')


@app.route('/destinations/dubai')
def destinations_dubai():
    return render_template('/hotel/b2c_hotels/destinations/dubai.html')


@app.route('/destinations/goa')
def destinations_goa():
    return render_template('/hotel/b2c_hotels/destinations/goa.html')


@app.route('/destinations/krabi')
def destinations_krabi():
    return render_template('/hotel/b2c_hotels/destinations/krabi.html')


@app.route('/destinations/ladakh')
def destinations_ladakh():
    return render_template('/hotel/b2c_hotels/destinations/ladakh.html')


@app.route('/destinations/london')
def destinations_london():
    return render_template('/hotel/b2c_hotels/destinations/london.html')


@app.route('/destinations/new-york')
def destinations_newyork():
    return render_template('/hotel/b2c_hotels/destinations/new-york.html')

@app.route('/destinations/pattaya')
def destinations_pattaya():
    return render_template('hotel/b2c_hotels/destinations/pattaya.html')

@app.route('/destinations/singapore')
def destinations_singapore():
    return render_template('hotel/b2c_hotels/destinations/singapore.html')

@app.route('/destinations/switzerland')
def destinations_switzerland():
    return render_template('hotel/b2c_hotels/destinations/switzerland.html')


#================= Experience Pages ==========================

@app.route('/experiences/bali')
def experiences_bali():
    return render_template('hotel/b2c_hotels/experiences/bali-rituals-experience-the-travel-square.html')

@app.route('/experiences/dubai')
def experiences_dubai():
    return render_template('hotel/b2c_hotels/experiences/dubai-aquarim-and-under-water-zoo-the-travel-square.html')

@app.route('/experiences/bangkok')
def experiences_bangkok():
    return render_template('hotel/b2c_hotels/experiences/floating-market-tour-bangkok.html')

@app.route('/experiences/kasol')
def experiences_kasol():
    return render_template('hotel/b2c_hotels/experiences/kasol-valley-tour-the-travel-square.html')

@app.route('/experiences/munnar')
def experiences_munnar():
    return render_template('hotel/b2c_hotels/experiences/munnar-wildlife-sanctuary-tour-the-travel-square.html')

@app.route('/experiences/phi-phi')
def experiences_phi_phi():
    return render_template('hotel/b2c_hotels/experiences/phi-phi-island-tour-experience-the-travel-square.html')

@app.route('/experiences/rishikesh')
def experiences_rishikesh():
    return render_template('hotel/b2c_hotels/experiences/rishikesh-rafting-tour-the-travel-square.html')


#================= Add on Pages hotels ==========================

@app.route('/travellers/gusts-of-wind-at-uttrakhand')
def travellers_uttrakhand():
    return render_template('hotel/b2c_hotels/travellers/gusts-of-wind-at-uttrakhand-story-the-travel-square.html')


@app.route('/travellers/mesmerising-beauty-of-kasol')
def travellers_kasol():
    return render_template('hotel/b2c_hotels/travellers/mesmerising-beauty-of-kasol-story-the-travel-square.html')


@app.route('/travellers/new-girl-in-london-town')
def travellers_london():
    return render_template('hotel/b2c_hotels/travellers/new-girl-in-london-town-story-the-travel-square.html')



#================= Add on Pages hotels ==========================


@app.errorhandler(400)
def page_not_found():
    return render_template("404.html"), 400


@app.route('/about', methods=['GET'])
def business_about():
    return render_template('hotel/footer_pages/about.html')


@app.route('/contact-us', methods=['GET'])
def business_contact_us():
    return render_template('hotel/footer_pages/contact-us.html')


@app.route('/customer-care', methods=['GET'])
def business_customer_care():
    return render_template('hotel/footer_pages/customer-care.html')


@app.route('/job-application', methods=['GET'])
def job_application():
    return render_template('hotel/footer_pages/job-and-internship-application-form.html')


@app.route('/jobs', methods=['GET'])
def business_jobs():
    return render_template('hotel/b2c_hotels/jobs.html')

@app.route('/legal', methods=['GET'])
def business_legal():
    return render_template('hotel/footer_pages/legal.html')


@app.route('/partner-care', methods=['GET'])
def business_partner_care():
    return render_template('hotel/footer_pages/partner-care.html')


@app.route('/press-release', methods=['GET'])
def business_press_release():
    return render_template('hotel/footer_pages/press-release.html')

@app.route('/terms-and-conditions')
def terms_and_conditions():
    return render_template('hotel/footer_pages/terms-and-conditions.html')

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('hotel/footer_pages/privacy-policy.html')
    
@app.route('/emi-application-form')
def emi_app():
    return render_template('hotel/b2c_hotels/emi-application-form.html')

@app.route('/emi')
def emi():
    return render_template('hotel/b2c_hotels/emi.html')


#================= collection hotels ==========================


@app.route('/hotel/collection/bed-and-breakfast-travel-beans', methods=['GET'])
def collection1():
    return render_template('hotel/collections/bed-and-breakfast.html')  
     

@app.route('/hotel/collection/boatstays-travel-beans', methods=['GET'])
def collection2():
    return render_template('hotel/collections/boatstays.html')   


@app.route('/hotel/collection/boutique-hotels-travel-beans', methods=['GET'])
def collection3():
    return render_template('hotel/collections/boutique-hotels.html')  


@app.route('/hotel/collection/budget-hotels-travel-beans', methods=['GET'])
def collection4():
    return render_template('hotel/collections/budget-hotels.html')             


@app.route('/hotel/collection/campsite-travel-beans', methods=['GET'])
def collection5():
    return render_template('hotel/collections/campsite.html')   


@app.route('/coming-soon')
def coming_soon():
    return render_template('hotel/b2c_hotels/coming-soon.html')  

@app.route('/application-submitted')
def job_success():
    return render_template('hotel/components/job-submitted.html')  

@app.route('/enquiry-submitted')
def enquiry_success():
    return render_template('hotel/components/enquiry-submitted.html')

#---------------------------Packages--------------------------#


@app.route('/package-booking')
def package_booking():
    return render_template('hotel/b2c_hotels/package-booking.html')

@app.route('/package-confirmation')
def package_confirmation():
    return render_template('hotel/b2c_hotels/package-confirmation.html')




@app.route('/packages')
def packages():
    return render_template('hotel/b2c_hotels/packages/packages.html')


@app.route('/packages/<string:package>', methods=['GET'])
def dynamic_packages(package):
    return render_template('hotel/b2c_hotels/packages/'+str(package)+'.html')

@app.route('/packages/TSP101CIA')
def packages_dubai():
    return render_template('hotel/b2c_hotels/packages/TSP101CIA.html')

@app.route('/packages/TSP102CIL')
def packages_bali():
    return render_template('hotel/b2c_hotels/packages/TSP102CIL.html')

@app.route('/packages/TSP103CDA')
def packages_goa():
    return render_template('hotel/b2c_hotels/packages/TSP103CDA.html')

@app.route('/packages/TSP104CIA')
def packages_104cia():
    return render_template('hotel/b2c_hotels/packages/TSP104CIA.html')

@app.route('/packages/TSP123CIL')
def packages_phuket():
    return render_template('hotel/b2c_hotels/packages/TSP123CIL-Phuket-and-Krabi-Land-Package-5-Nights.html')

@app.route('/packages/TSP107CIL')
def packages_bangkok():
    return render_template('hotel/b2c_hotels/packages/TSP107CIL-Bangkok & Pattaya 4N.html')


@app.route('/packages/TSP108CIL')
def packages_krabi():
    return render_template('hotel/b2c_hotels/packages/TSP108CIL Krabi 3N.html')


@app.route('/packages/TSP109CIL')
def packages_malaysia():
    return render_template('hotel/b2c_hotels/packages/TSP109CIL Malaysia 5N.html')


@app.route('/packages/TSP110CIL')
def packages_singapore():
    return render_template('hotel/b2c_hotels/packages/TSP110CIL Singapore 3N.html')


@app.route('/packages/TSP111CIL')
def packages_andaman():
    return render_template('hotel/b2c_hotels/packages/TSP111CIL Andaman 4N.html')

@app.route('/packages/TSP124CIL')
def packages_124cil():
    return render_template('hotel/b2c_hotels/packages/TSP124CIL.html')

@app.route('/packages/TSP125CIL')
def packages_125cil():
    return render_template('hotel/b2c_hotels/packages/TSP125CIL.html')

@app.route('/packages/TSP126CIL')
def packages_bali2():
    return render_template('hotel/b2c_hotels/packages/TSP126CIL-luxurious-and-leisure-bali-package.html')

@app.route('/packages/TSP106CIL')
def packages_phuket2():
    return render_template('hotel/b2c_hotels/packages/TSP106CIL-Phuket-and-Krabi-Honeymoon-Package-4-Nights.html')

@app.route('/packages/TSP131CIL')
def packages_131cil():
    return render_template('hotel/b2c_hotels/packages/TSP131CIL.html')

@app.route('/packages/TSP132CIL')
def packages_132cil():
    return render_template('hotel/b2c_hotels/packages/TSP132CIL.html')

@app.route('/packages/TSP134CIL')
def packages_134cil():
    return render_template('hotel/b2c_hotels/packages/TSP134CIL.html')

@app.route('/packages/TSP135CIL')
def packages_135il():
    return render_template('hotel/b2c_hotels/packages/TSP135CIL.html')

@app.route('/packages/TSP136CIL')
def packages_136cil():
    return render_template('hotel/b2c_hotels/packages/TSP136CIL.html')

@app.route('/packages/TSP137CIL')
def packages_137cil():
    return render_template('hotel/b2c_hotels/packages/TSP137CIL.html')

@app.route('/packages/TSP138CIL')
def packages_138cil():
    return render_template('hotel/b2c_hotels/packages/TSP138CIL.html')

@app.route('/packages/TSP142CIL')
def packages_142cil():
    return render_template('hotel/b2c_hotels/packages/TSP142CIL.html')

@app.route('/packages/TSP132CIA')
def packages_dubai2():
    return render_template('hotel/b2c_hotels/packages/TSP132CIA-dubai-3-nights-adventure-package.html')

@app.route('/packages/TSP136CIL')
def packages_bali3():
    return render_template('hotel/b2c_hotels/packages/TSP136CIL-luxurious-and-leisure-bali-package.html')
    

@app.route('/packages/TSP134CIL')
def packages_dubai3():
    return render_template('hotel/b2c_hotels/packages/TSP134CIL.html')

@app.route('/packages/TSP139CIA')
def packages_139cia():
    return render_template('hotel/b2c_hotels/packages/TSP139CIA.html')

@app.route('/packages/TSP140CIA')
def packages_140cia():
    return render_template('hotel/b2c_hotels/packages/TSP140CIA.html')

@app.route('/packages/TSP141CIA')
def packages_141cia():
    return render_template('hotel/b2c_hotels/packages/TSP141CIA.html')

@app.route('/dashboard')
def dashboard():
    return render_template('hotel/b2c_hotels/customer-dashboard.html')

@app.route('/enquiry')
def enquiry():
    return render_template('hotel/b2c_hotels/enquiry.html')

@app.route('/enquiry/hotel')
def hotel_enquiry():
    return render_template('hotel/b2c_hotels/enquiry/hotel-enquiry.html')


# @app.route('/bb')
# def bb():
#     return render_template('hotel/b2c_hotels/JLADI KRA.html')

# @app.route('/bb')
# def bb():
#     return render_template('hotel/b2c_hotels/bb.html')


@app.route('/offers-and-deals')
def offers():
    return render_template('hotel/b2c_hotels/offers-and-deal.html')


@app.route('/supplier-verification')
def bb():
    return render_template('hotel/b2c_hotels/supplier-verification-form.html')


########################################## Visa #########################################

@app.route('/visa')
def visa():
    return render_template('hotel/b2c_hotels/visa/visa-home.html')


@app.route('/visa-list')
def visa_list():
    return render_template('hotel/b2c_hotels/visa/visa-list-view.html')


@app.route('/visa-detail')
def visa_detail():
    return render_template('hotel/b2c_hotels/visa/visa-detail-view.html')


@app.route('/visa-application')
def visa_app():
    return render_template('hotel/b2c_hotels/visa/visa-application-form.html')


@app.route('/dropdown')
def test():
    return render_template('hotel/b2c_hotels/visa/testing.html')

@app.route('/image')
def image():
    return render_template('hotel/b2c_hotels/images.html')