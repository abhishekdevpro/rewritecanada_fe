import { Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { BASE_URL } from "../../components/Constant/constant";
import { toast } from "react-toastify";
import Link from "next/link";

export default function PaymentPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [showPlanPurchase, setShowPlanPurchase] = useState(false);

  // Extract features from i18n data
  const getPlanFeatures = (planKey) => {
    const features = [];
    for (let i = 1; i <= 11; i++) {
      const featureKey = `pricing.${planKey}.feature${i}`;
      const translatedFeature = t(featureKey);
      if (translatedFeature !== featureKey) {
        features.push(translatedFeature);
      }
    }
    return features;
  };

  const formatPrice = (planKey) => {
    const price = t(`pricing.${planKey}.price`);
    const billingCycle = t(`pricing.${planKey}.billingCycle`);
    if (price === "0") return t("pricing.freeLabel");

    if (billingCycle === "single") {
      return `$${price}`;
    } else if (billingCycle === "month") {
      return `$${price}/${t("plans.mo")}`;
    } else if (billingCycle === "year") {
      return `$${price}/${t("plans.yr")}`;
    }

    return `$${price}`;
  };

  const getRenewalText = (planKey) => {
    const billingCycle = t(`pricing.${planKey}.billingCycle`);
    if (billingCycle === "single") return t("plans.one-time payment");
    if (billingCycle === "month") return t("plans.every month");
    if (billingCycle === "year") return t("plans.every year");
    return "";
  };

  useEffect(() => {
    if (router.query.plan) {
      const planId = router.query.plan;
      setSelectedPlan(planId);
      setPlanDetails({
        title: t(`pricing.${planId}.title`),
        billingCycle: t(`pricing.${planId}.billingCycle`),
        price: t(`pricing.${planId}.price`),
      });
    }
  }, [router.query, t]);

  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.success(t("paymentss.selectPlan"));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("paymentss.authRequired"));
      router.push("/login2");
      return;
    }

    const planMapping = {
      freePlan: 1,
      // threeDays: 2,
      weeklyplan: 3,
      aiProMonth: 4,
      aiProthreeMonth: 5,
      aiProYearly: 6,
    };

    const planId = planMapping[selectedPlan];

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/payment/checkout`,
        { plan_id: planId },
        { headers: { Authorization: token } }
      );

      if (response.status === 200 && response.data.url) {
        toast.success(t("paymentss.redirecting"));
        window.location.href = response.data.url;
      } else {
        toast.error(t("paymentss.alreadySubscribed"));
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || t("paymentss.genericError"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-b from-white to-mainColor p-6">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 md:flex">
          <div className="p-6">
            <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg mt-6 md:mt-0">
              <h3 className="font-semibold text-lg">
                {t("plans.Review your order")}
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>{t("plans.Plan")}:</strong> {planDetails?.title || ""}
              </p>

              <ul className="mt-4 space-y-2">
                {selectedPlan &&
                  getPlanFeatures(selectedPlan).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}

                {planDetails?.billingCycle !== "single" && (
                  <li className="flex items-start">
                    <CheckCircle
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <span>
                      {t("plans.Automatically renews")}{" "}
                      {getRenewalText(selectedPlan)}.
                    </span>
                  </li>
                )}
              </ul>

              <div className="mt-6 bg-[#00b38d] text-white p-4 rounded-lg text-center text-lg font-semibold">
                {t("plans.Total due today")} <br />
                <span className="text-2xl">
                  {selectedPlan ? formatPrice(selectedPlan) : ""}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              {t("plans.By clicking")}{" "}
              <strong>&quot;{t("plans.Start applying")}&quot;</strong>{" "}
              {t("plans.below, you agree to our")}{" "}
              <Link
                href="/TermsandConditions"
                className="text-[#00b38d] underline"
              >
                {t("plans.Terms of Use")}
              </Link>{" "}
              {t("plans.and")}{" "}
              <Link
                href="/footers/PrivacyPolicy"
                className="text-[#00b38d] underline"
              >
                {t("plans.Privacy Policy")}
              </Link>
              . {t("plans.You also understand that you will be billed")}{" "}
              <strong>{formatPrice(selectedPlan)}</strong>,{" "}
              {t("plans.which will automatically renew")}{" "}
              {getRenewalText(selectedPlan)}.{" "}
              <strong>{t("plans.You can cancel at any time.")}</strong>
            </p>

            <button
              onClick={() => setShowPlanPurchase(true)}
              className={`mt-6 w-full text-white text-lg font-semibold py-3 rounded-lg ${
                selectedPlan === "freePlan"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00b38d]"
              }`}
              disabled={selectedPlan === "freePlan"}
            >
              Start Creating
            </button>

            {showPlanPurchase && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm text-center">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    {t("plan.confirm_title")}
                  </h2>
                  <p className="mb-6 text-gray-600">
                    {t("plan.confirm_message")}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        handleCheckout();
                        setShowPlanPurchase(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      {t("plan.confirm_yes")}
                    </button>
                    <button
                      onClick={() => setShowPlanPurchase(false)}
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                    >
                      {t("plan.confirm_no")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center mt-4 text-sm text-gray-600">
              <Lock className="text-green-500 mr-2" size={20} />
              <span>{t("plans.SECURE CHECKOUT")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
