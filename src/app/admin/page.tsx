'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ShieldCheck, PackageSearch, AlertTriangle, X, TrendingUp, 
  ShoppingBag, XCircle, Search, Clock, Loader, CheckCircle, CreditCard 
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, orderId: '', newStatus: '' });
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    else if (status === 'authenticated') fetchOrders();
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (res.ok && data.success) setOrders(data.orders);
      else router.push('/account'); 
    } catch (error) {
      console.error('Failed to fetch orders');
    }
    setLoading(false);
  };

  const initiateStatusChange = (orderId: string, newStatus: string) => {
    setModalConfig({ isOpen: true, orderId, newStatus });
  };

  const confirmStatusChange = async () => {
    const { orderId, newStatus } = modalConfig;
    setModalConfig({ ...modalConfig, isOpen: false });

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.ok) {
        setToastMessage('✅ Order status updated successfully!');
        setTimeout(() => setToastMessage(''), 3000);
        fetchOrders();
      }
    } catch (error) {
      setToastMessage('❌ Update failed!');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  // ==========================================
  // 📊 ADVANCED ANALYTICS CALCULATIONS
  // ==========================================
  
  // 1. Money Metrics
  const deliveredRevenue = orders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingRevenue = orders
    .filter(o => ['Order Placed', 'Processing', 'Shipped'].includes(o.status))
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // 2. Order Counts
  const newOrdersCount = orders.filter(o => o.status === 'Order Placed').length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const cancelledCount = orders.filter(o => o.status === 'Cancelled' || o.status === 'Cancellation Requested').length;

  // 🔍 SEARCH FILTERING
  const filteredOrders = orders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (order.shippingAddress?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pb-16 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-50 text-green-700 px-6 py-3 rounded-full shadow-lg border border-green-200 font-bold text-sm flex items-center gap-2 animate-in slide-in-from-top-5">
          {toastMessage}
        </div>
      )}

      {/* Confirmation Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center"><AlertTriangle size={24} /></div>
              <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-900 mb-2">Change Order Status</h3>
            <p className="text-gray-500 text-sm mb-6">Change status of <strong className="text-charcoal">{modalConfig.orderId}</strong> to <strong className="text-brand-900">{modalConfig.newStatus}</strong>?</p>
            <div className="flex gap-3">
              <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={confirmStatusChange} className="flex-1 px-4 py-2.5 rounded-lg bg-brand-900 text-cream font-bold text-sm hover:bg-brand-800 transition-colors shadow-md">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-brand-900 text-cream py-10 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <ShieldCheck size={32} /> Business Control Panel
        </h1>
        <p className="font-sans text-brand-100 text-sm">Monitor revenue, pending payments, and order fulfillment</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* 📊 6-GRID ADVANCED ANALYTICS DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          
          {/* Revenue Delivered */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><TrendingUp size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Net Revenue (Delivered)</p>
              <h3 className="text-xl font-serif font-bold text-brand-900">₹{deliveredRevenue.toLocaleString()}</h3>
            </div>
          </div>

          {/* Pending Payment */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"><Clock size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Payment (Transit)</p>
              <h3 className="text-xl font-serif font-bold text-brand-900">₹{pendingRevenue.toLocaleString()}</h3>
            </div>
          </div>

          {/* New Orders */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><ShoppingBag size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">New Orders (Action Req.)</p>
              <h3 className="text-xl font-serif font-bold text-brand-900">{newOrdersCount} Orders</h3>
            </div>
          </div>

          {/* Processing */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Loader size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">In Processing / Making</p>
              <h3 className="text-xl font-serif font-bold text-brand-900">{processingCount} Orders</h3>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><CheckCircle size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Successfully Delivered</p>
              <h3 className="text-xl font-serif font-bold text-brand-900">{deliveredCount} Orders</h3>
            </div>
          </div>

          {/* Cancelled */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><XCircle size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cancelled / Returns</p>
              <h3 className="text-xl font-serif font-bold text-brand-900">{cancelledCount} Orders</h3>
            </div>
          </div>

        </div>

        {/* ORDER LIST TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="font-serif text-2xl font-bold text-brand-900 flex items-center gap-2">
              <PackageSearch /> All Customer Orders
            </h2>
            
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search Order ID or Name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-900 transition-colors bg-gray-50"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-50 text-brand-900 text-xs uppercase tracking-wider border-b border-brand-100">
                  <th className="p-4 font-bold rounded-tl-lg">Order ID & Date</th>
                  <th className="p-4 font-bold">Customer Details</th>
                  <th className="p-4 font-bold">Items & Total</th>
                  <th className="p-4 font-bold rounded-tr-lg">Action & Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    
                    <td className="p-4 align-top">
                      <div className="font-bold text-brand-900">{order.orderId}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleString('en-IN', { 
                          day: 'numeric', month: 'short', year: 'numeric', 
                          hour: '2-digit', minute: '2-digit', hour12: true 
                        })}
                      </div>
                      {order.status === 'Cancellation Requested' && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase animate-pulse">
                          User Wants to Cancel
                        </span>
                      )}
                    </td>

                    <td className="p-4 align-top text-sm">
                      <div className="font-bold text-charcoal">{order.shippingAddress?.fullName}</div>
                      <div className="text-gray-600 mt-1">{order.shippingAddress?.phone}</div>
                      <div className="text-gray-500 text-xs mt-1 max-w-[200px] line-clamp-2">
                        {order.shippingAddress?.addressLine}, {order.shippingAddress?.city}
                      </div>
                    </td>

                    <td className="p-4 align-top text-sm">
                      <div className="text-gray-600 font-medium">{order.items.length} Items</div>
                      <div className="font-bold text-brand-900 mt-1">₹{order.totalAmount.toLocaleString()}</div>
                      <div className="text-xs font-bold mt-1 flex items-center gap-1 text-orange-600">
                        <CreditCard size={12} /> {order.paymentMethod}
                      </div>
                    </td>

                    <td className="p-4 align-top">
                      <select 
                        value={order.status}
                        onChange={(e) => initiateStatusChange(order.orderId, e.target.value)}
                        className={`text-sm font-bold border rounded-md p-2.5 w-full max-w-[200px] outline-none cursor-pointer transition-colors shadow-sm ${
                          order.status === 'Cancellation Requested' ? 'border-red-400 text-red-700 bg-red-50' : 
                          order.status === 'Cancelled' ? 'border-gray-200 text-gray-500 bg-gray-50' :
                          order.status === 'Delivered' ? 'border-green-200 text-green-700 bg-green-50' :
                          'border-gray-200 text-charcoal hover:border-brand-900'
                        }`}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancellation Requested" disabled>Cancellation Requested</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">
                      No orders found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}