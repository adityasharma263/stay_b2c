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
    return render_template('hotel/b2c_hotels/hotel.html')


@app.route('/hotel', methods=['GET'])
def hotel():
    return render_template('hotel/b2c_hotels/hotel.html')


@app.route('/hotel/list', methods=['GET'])
def hotel_list():
    return render_template('hotel/b2c_hotels/hotel_list.html')


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

@app.route('/travellers/uttrakhand')
def travellers_uttrakhand():
    return render_template('hotel/b2c_hotels/travellers/gusts-of-wind-at-uttrakhand-story-the-travel-square.html')


@app.route('/travellers/kasol')
def travellers_kasol():
    return render_template('hotel/b2c_hotels/travellers/mesmerising-beauty-of-kasol-story-the-travel-square.html')


@app.route('/travellers/london')
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


@app.route('/jobs', methods=['GET'])
def business_jobs():
    return render_template('hotel/footer_pages/job-and-internship-application-form.html')


@app.route('/legal', methods=['GET'])
def business_legal():
    return render_template('hotel/footer_pages/legal.html')


@app.route('/partner-care', methods=['GET'])
def business_partner_care():
    return render_template('hotel/footer_pages/partner-care.html')


@app.route('/press-release', methods=['GET'])
def business_press_release():
    return render_template('hotel/footer_pages/press-release.html')


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



