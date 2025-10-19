import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, CheckCircle2, Hotel } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { BookingSummaryCard } from "../Checkout/BookingSummaryCard";
import apiRequest from "../../api/apiRequest";
import { useParams } from "react-router-dom";

export default function CheckoutPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const { id } = useParams();

  const [currentRoomData, setCurrentRoomData] = useState([]);

  const getRoomDetails = async () => {
    try {
      const response = await apiRequest({
        method: "GET",
        url: `/api/rooms/${id}`,
      });

      console.log(response.room);
      setCurrentRoomData(response.room);
    } catch (err) {
      console.log("ROOMS FETCHING ERROR : ", err);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setIsConfirmed(true);
      // Scroll to top to show confirmation
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  const bookingData = {
    hotelName: "Grand Luxury Hotel & Spa",
    roomName: "Deluxe Ocean View Suite",
    image:
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NjAyNjA4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 9.2,
    reviews: 1284,
    location: "Downtown Dubai, UAE",
    guests: 2,
    checkIn: "Dec 15, 2025",
    checkOut: "Dec 18, 2025",
    nights: 3,
    pricePerNight: 245,
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl">
                <Hotel className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-neutral-900">Luxe Stay</span>
            </div>
          </div>
        </header>

        {/* Confirmation Section */}
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-full mb-6"
            >
              <CheckCircle2 className="h-10 w-10 text-teal-600" />
            </motion.div>

            <h1 className="text-3xl text-neutral-900 mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Your reservation has been successfully confirmed. A confirmation
              email has been sent to {formData.email}.
            </p>

            <div className="bg-neutral-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg text-neutral-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Confirmation Code</span>
                  <span className="text-neutral-900 font-mono">
                    LX-
                    {Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Hotel</span>
                  <span className="text-neutral-900">
                    {bookingData.hotelName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Room</span>
                  <span className="text-neutral-900">
                    {bookingData.roomName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-in</span>
                  <span className="text-neutral-900">
                    {bookingData.checkIn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-out</span>
                  <span className="text-neutral-900">
                    {bookingData.checkOut}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                className="rounded-xl border-neutral-300"
                onClick={() => window.print()}
              >
                Print Confirmation
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 rounded-xl"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="rounded-xl"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="hidden sm:flex items-center gap-3">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl">
                  <Hotel className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl text-neutral-900">Luxe Stay</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-500">Secure Checkout</p>
              <p className="text-neutral-900">Complete Your Booking</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Guest Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"
            >
              <h2 className="text-xl text-neutral-900 mb-6">
                Guest Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="text-neutral-700">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-2 rounded-xl border-neutral-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="text-neutral-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl border-neutral-300"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-neutral-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl border-neutral-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="specialRequests" className="text-neutral-700">
                    Special Requests{" "}
                    <span className="text-neutral-400">(Optional)</span>
                  </label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    placeholder="Any special requests or preferences..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="mt-2 rounded-xl border-neutral-300 min-h-[100px]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-neutral-600" />
                <h2 className="text-xl text-neutral-900">
                  Payment Information
                </h2>
              </div>

              <form onSubmit={handlePayment} className="space-y-5">
                <div>
                  <label htmlFor="cardNumber" className="text-neutral-700">
                    Card Number
                  </label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="mt-2 rounded-xl border-neutral-300"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="expiryDate" className="text-neutral-700">
                      Expiry Date
                    </label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl border-neutral-300"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv" className="text-neutral-700">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl border-neutral-300"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <Separator className="my-6 bg-neutral-100" />

                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-teal-900">
                    🔒 Your payment information is encrypted and secure. We use
                    industry-standard security measures to protect your data.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 rounded-xl py-6 text-lg"
                >
                  Complete Booking & Pay $
                  {(
                    bookingData.pricePerNight *
                    bookingData.nights *
                    1.15
                  ).toFixed(2)}
                </Button>

                <p className="text-xs text-center text-neutral-500">
                  By completing this booking, you agree to our Terms of Service
                  and Privacy Policy.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <BookingSummaryCard {...bookingData} />
          </motion.div>

          {/* Mobile Booking Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden"
          >
            <BookingSummaryCard {...bookingData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
