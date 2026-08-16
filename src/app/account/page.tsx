'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, User, MapPin, LogOut, ShoppingBag, Save } from 'lucide-react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // 🚨 FIX 1: Session Storage me tab yaad rakhna aur default 'orders' set karna
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('accountTab') || 'orders';
    }
    return 'orders';
  });
  
  const [profileData, setProfileData] = useState({
    phone: '',
    address: { street: '', city: '', state: '', pincode: '' }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Tab change karne ka function jo choice ko save bhi karega
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    sessionStorage.setItem('accountTab', tabName);
  };

  // 🚨 FIX 2: Orders fetch karne ka alag function banaya
  const fetchUserOrders = () => {
    fetch('/api/orders/user')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
        setOrdersLoading(false);
      })
      .catch(() => setOrdersLoading(false));
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      
      // Profile Fetch
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data) {
            setProfileData({
              phone: data.phone || '',
              address: data.address || { street: '', city: '', state: '', pincode: '' }
            });
          }
        });

      // Pehli baar Orders Fetch
      fetchUserOrders();

      // 🚨 THE MAGIC HACK: Jab bhi user is tab par wapas aayega, data auto-refresh hoga!
      window.addEventListener('focus', fetchUserOrders);
      return () => window.removeEventListener('focus', fetchUserOrders);
    }
  }, [status, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (res.ok) {
        setMessage('✅ Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Failed to update profile.');
    }
    setIsLoading(false);
  };

  const handleCancelRequest = async (orderId: string) => {
    if (!confirm('Are you sure you want to request cancellation for this order? Our team will contact you shortly.')) return;
    try {
      const res = await fetch('/api/orders/cancel', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      if (res.ok) {
        alert('Cancellation request sent successfully!');
        fetchUserOrders(); // Turant refresh
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-900"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <div className="bg-brand-900 text-cream py-12 px-4 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">My Account</h1>
        <p className="font-sans text-brand-100 text-sm">Welcome back, {session.user?.name}!</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2">
              <button onClick={() => handleTabChange('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'orders' ? 'bg-brand-50 text-brand-900' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Package size={18} /> My Orders
              </button>
              <button onClick={() => handleTabChange('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'profile' ? 'bg-brand-50 text-brand-900' : 'text-gray-600 hover:bg-gray-50'}`}>
                <User size={18} /> Profile Details
              </button>
              <button onClick={() => handleTabChange('address')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'address' ? 'bg-brand-50 text-brand-900' : 'text-gray-600 hover:bg-gray-50'}`}>
                <MapPin size={18} /> Saved Address
              </button>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </aside>

          <main className="w-full md:w-3/4">
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold text-brand-900 mb-6">Order History</h2>
                {ordersLoading ? (
                  <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-900"></div></div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400"><ShoppingBag size={30} /></div>
                    <h3 className="font-bold text-charcoal mb-2">No orders placed yet</h3>
                    <Link href="/shop" className="inline-block mt-4 bg-brand-900 text-cream px-6 py-3 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-brand-800 transition-colors shadow-md">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-gray-50/50">
                        <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-200 pb-4 mb-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 font-bold tracking-wider uppercase mb-1">Order ID</p>
                            <p className="font-bold text-brand-900">{order.orderId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold tracking-wider uppercase mb-1">Date</p>
                            <p className="font-medium text-charcoal">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold tracking-wider uppercase mb-1">Total</p>
                            <p className="font-bold text-brand-900">₹{order.totalAmount}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                              order.status === 'Processing' || order.status === 'Order Placed' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Cancellation Requested' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              order.status === 'Shipped' ? 'bg-orange-100 text-orange-700' :
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status}
                            </span>
                            {(order.status === 'Processing' || order.status === 'Order Placed') && (
                              <button onClick={() => handleCancelRequest(order.orderId)} className="text-xs text-red-500 font-bold hover:text-red-700 underline transition-colors mt-1">
                                Request Cancellation
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-16 h-20 bg-gray-200 rounded-md overflow-hidden relative border border-gray-200 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-charcoal">{item.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                                <p className="text-sm font-bold text-brand-900 mt-1">₹{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE DETAILS TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold text-brand-900 mb-6">Profile Details</h2>
                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" value={session.user?.name || ''} disabled className="w-full border border-gray-200 rounded-md py-3 px-4 bg-gray-50 text-gray-600 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" value={session.user?.email || ''} disabled className="w-full border border-gray-200 rounded-md py-3 px-4 bg-gray-50 text-gray-600 cursor-not-allowed" />
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESS & CONTACT TAB */}
            {activeTab === 'address' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold text-brand-900 mb-6">Contact & Shipping Address</h2>
                {message && <div className="mb-6 p-3 bg-green-50 text-green-700 text-sm font-bold rounded-md border border-green-200">{message}</div>}
                <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Street Address / Flat No.</label>
                    <input type="text" value={profileData.address.street} onChange={(e) => setProfileData({...profileData, address: {...profileData.address, street: e.target.value}})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">City</label>
                      <input type="text" value={profileData.address.city} onChange={(e) => setProfileData({...profileData, address: {...profileData.address, city: e.target.value}})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">State</label>
                      <input type="text" value={profileData.address.state} onChange={(e) => setProfileData({...profileData, address: {...profileData.address, state: e.target.value}})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Pincode</label>
                      <input type="text" value={profileData.address.pincode} onChange={(e) => setProfileData({...profileData, address: {...profileData.address, pincode: e.target.value}})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-brand-900 text-cream px-8 py-3 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-colors shadow-md disabled:opacity-70">
                      <Save size={18} /> {isLoading ? 'Saving...' : 'Save Details'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}