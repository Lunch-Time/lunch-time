using System;
using System.Collections.Generic;
using System.Linq;

using Dinner.Entities;
using Dinner.Entities.Course;
using Dinner.Entities.IdentityCards;
using Dinner.Entities.MenuItem;
using Dinner.Entities.Order;
using Dinner.Storage.Repository;

namespace Dinner.Storage.Impl
{
    internal sealed class UserDinnerStorage : IUserDinnerStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public UserDinnerStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public IEnumerable<CourseModel> GetDayMenu(int companyID, DateTime date)
        {
            var results = new List<CourseModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_GetDayMenu(companyID, date);
                results.AddRange(list.Select(item => new CourseModel
                {
                    CategoryName = item.CourseCategoryName,
                    CategoryType = (CourseCategories)item.CourseCategoryID,
                    ID = item.CourseID,
                    CompanyID = item.CompanyID,
                    Name = item.Name,
                    MenuItemID = item.MenuID,
                    Price = (float)item.Price,
                    Description = item.Description,
                    Weight = item.Weight,
                    MaxOrders = item.Limit,
                    OrderedQuantity = item.OrderedQuantity.HasValue ? (float)item.OrderedQuantity.Value : (float)0
                }
                ));
            }

            return results;
        }

        public IEnumerable<TimingModel> GetDayTiming(int companyID, DateTime date)
        {
            IList<TimingModel> result = new List<TimingModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var timingCollection = dataContext.p_GetDayTiming(companyID, date);
                foreach (var timing in timingCollection)
                {
                    result.Add(new TimingModel
                    {
                        Time = timing.Time,
                        Count = timing.Count.HasValue ? timing.Count.Value : 0 
                    });
                }
            }
            return result;
        }

        public OrderResult AddOrderItem(int userId, int courseId, DateTime date, float quantity)
        {
            OrderResult result = null;

            using (var dataContext = this.dataContextFactory.Create())
            {
                try
                {
                    var res = dataContext.p_AddOrderItem(userId, courseId, date, (decimal)quantity).First();
                    result = new OrderResult
                    {
                        ID = res.ID.HasValue ? res.ID.Value : 0,
                        Limit = res.Limit.HasValue ? res.Limit.Value : 0,
                        RestQuantity = res.RestQuantity.HasValue ? (float) res.RestQuantity.Value : 0,
                        CourseBoxQuantity = res.CourseBoxQuantity.HasValue ? (float)res.CourseBoxQuantity.Value : 0
                    };
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex + " - " + ex.InnerException);
                }
            }
            return result;
        }

        public OrderResult RemoveOrder(int orderId)
        {
            OrderResult result = null;

            using (var dataContext = this.dataContextFactory.Create())
            {
                try
                {
                    var res = dataContext.p_Order_Delete(orderId).First();
                    result = new OrderResult
                    {
                        ID = 0,
                        Limit = res.Limit,
                        RestQuantity = res.RestQuantity.HasValue ? (float)res.RestQuantity.Value : 0,
                        CourseBoxQuantity = res.CourseBoxQuantity
                    };
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex + " - " + ex.InnerException);
                }
            }
            return result;
        }

        public OrderResult RemoveOrderItem(int userId, int orderItemId, DateTime date)
        {
            OrderResult result = null;

            using (var dataContext = this.dataContextFactory.Create())
            {
                try
                {
                    var res = dataContext.p_DeleteOrderItem(userId, date, orderItemId).First();
                    result = new OrderResult
                    {
                        ID = 0,
                        Limit = res.Limit,
                        RestQuantity = res.RestQuantity.HasValue ? (float)res.RestQuantity.Value : 0,
                        CourseBoxQuantity = res.CourseBoxQuantity
                    };
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex + " - " + ex.InnerException);
                }
            }
            return result;
        }

        public ChangeOrderItemBoxindexResult ChangeOrderItemBoxindex(int userId, int orderItemId, DateTime date, float quantity, short boxindex)
        {
            ChangeOrderItemBoxindexResult result;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var res = dataContext.p_ChangeOrderItemBoxindex(orderItemId, userId, date, (decimal)quantity, boxindex)
                    .SingleOrDefault();
                if (res == null)
                {
                    throw new NotSupportedException();
                }
                result = new ChangeOrderItemBoxindexResult()
                {
                    NewID = res.NewID.HasValue ? res.NewID.Value : 0,
                    NewQuantity = res.NewQuantity.HasValue ? (float) res.NewQuantity.Value : 0,
                    OldID = res.OldID.HasValue ? res.OldID.Value : 0,
                    OldQuantity = res.OldQuantity.HasValue ? (float) res.OldQuantity.Value : 0
                };
            }
            return result;
        }

        public void SetDinnerTime(int userId, DateTime date, TimeSpan? time)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_SetOrderTime(userId, date, time);
            }
        }

        public TimeSpan? GetDinnerTime(int userId, DateTime date)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                return dataContext.p_GetOrderTime(userId, date).First();
            }
        }

        public UserOrdersModel GetUserOrderById(int orderId, DateTime day)
        {
            var result = new UserOrdersModel
            {
                Orders = new List<OrderedMenuModel>()
            };
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_UserOrder_GetByID(orderId, day);

                foreach (var item in list)
                {
                    if (result.Orders.Count == 0)
                    {
                        result.OrderID = item.OrderID;
                        result.IsPurchased = item.IsPurchased;
                        result.UserID = item.UserID;
                        result.UserName = string.Empty; //TODO? 
                    }
                    result.Orders.Add(new OrderedMenuModel
                    {
                        Course = new CourseModel
                        {
                            CategoryName = item.CourseCategoryName,
                            CategoryType = (CourseCategories) item.CourseCategoryID,
                            ID = item.CourseID,
                            CompanyID = item.CompanyID,
                            Name = item.Name,
                            Price = (float) item.Price,
                            Description = item.Description,
                            Weight = item.Weight
                        },
                        Quantity = (float) item.Quantity,
                        IsPurchased = item.IsPurchased
                    });
                }
            }
            return result;
        }

        public IEnumerable<CourseModel> GetAllCourses(int companyId, bool includeDeleted)
        {
            var results = new List<CourseModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_GetCourses(companyId, includeDeleted);
                results.AddRange(list.Select(item => new CourseModel
                {
                    ID = item.CourseID,
                    CompanyID = item.CompanyID,
                    CategoryType = (CourseCategories) item.CourseCategoryID, 
                    CategoryName = item.CourseCategoryName, 
                    Name = item.Name,
                    Price = (float) item.Price,
                    Description = item.Description,
                    Weight = item.Weight
                }));
            }
            return results;
        }

        public IEnumerable<OrderedMenuModel> GetUserOrderForDay(int companyId, int userId, DateTime day)
        {
            var results = new List<OrderedMenuModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_GetUserOrderForDay(companyId, userId, day);
                results.AddRange(list.Select(item => new OrderedMenuModel
                {
                    Course = new CourseModel
                    {
                        CategoryName = item.CourseCategoryName,
                        CategoryType = (CourseCategories)item.CourseCategoryID, 
                        ID = item.CourseID, 
                        Name = item.Name,
                        MenuItemID = item.MenuID,
                        Price = (float) item.Price,
                        OrderItemID = item.OrderItemID,
                        Boxindex = item.Boxindex
                    },
                    Quantity = (double) item.Quantity,
                    IsPurchased = item.IsPurchased
                }));
            }

            return results;
        }

        public IDictionary<DateTime, UserOrdersModel> GetUserOrderForPeriod(int companyId, int userId, DateTime startDate, DateTime endDate)
        {
            var results = new Dictionary<DateTime, UserOrdersModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_GetUserOrderForPeriod(companyId, userId, startDate, endDate);
                foreach (var item in list)
                {
                    UserOrdersModel orderedList;
                    if (!results.ContainsKey(item.Date))
                    {
                        orderedList = new UserOrdersModel()
                        {
                            OrderID = item.OrderID,
                            IsPurchased = item.IsPurchased,
                            UserID = item.UserID,
                            UserName = item.Name,
                            Orders = new List<OrderedMenuModel>()
                        };
                        results.Add(item.Date, orderedList);
                    }
                    else
                    {
                        orderedList = results[item.Date];
                    }
                    orderedList.Orders.Add(new OrderedMenuModel
                    {
                        Course = new CourseModel
                        {
                            CategoryName = item.CourseCategoryName,
                            CategoryType = (CourseCategories) item.CourseCategoryID,
                            ID = item.CourseID,
                            Name = item.Name,
                            MenuItemID = item.MenuID,
                            Price = (float) item.Price,
                            OrderItemID = item.OrderItemID,
                            Boxindex = item.Boxindex
                            //OrderedQuantity = item.
                        },
                        Quantity = (double) item.Quantity,
                        IsPurchased = item.IsPurchased
                    });
                }
            }

            return results;
        }

        public IEnumerable<UserOrdersModel> GetAllOrdersForDay(int companyId, DateTime day)
        {
            var results = new Dictionary<int, UserOrdersModel>();

            Func<p_GetAllOrdersByDate_Result, UserOrdersModel> getUserOrders = user =>
                {
                    if (results.ContainsKey(user.UserID))
                    {
                        return results[user.UserID];
                    }

                    var userOrders = new UserOrdersModel
                        {
                            OrderID = user.OrderID,
                            UserID = user.UserID,
                            UserName = user.UserName,
                            IsPurchased = user.IsPurchased,
                            UserIdentityNumber = user.UserIdentityNumber,
                            Orders = new List<OrderedMenuModel>()
                        };

                    results[user.UserID] = userOrders;
                    return userOrders;
                };

            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_GetAllOrdersByDate(companyId, day);

                foreach (var item in list)
                {                    
                    var userOrders = getUserOrders(item);
                    var order = new OrderedMenuModel
                        {
                            Course =
                                new CourseModel
                                    {
                                        ID = item.CourseID,
                                        CategoryName = item.CourseCategoryName,
                                        CategoryType = (CourseCategories)item.CourseCategoryID, 
                                        Name = item.CourseName,
                                        Price = (float)item.CoursePrice,
                                        OrderItemID = item.OrderItemID,
                                        Boxindex = item.Boxindex
                                    },
                            Quantity = (double)item.Quantity,
                            IsPurchased = item.IsPurchased
                        };
                    userOrders.Orders.Add(order);
                }
            }

            return results.Values.OrderBy(x => x.UserName);
        }

        public UserSettingsModel GetUserSettings(int userId)
        {
            UserSettingsModel result = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var userSettings = dataContext.UserSettings.SingleOrDefault(x => x.UserID == userId);

                if (userSettings != null)
                {
                    result = new UserSettingsModel
                    {
                        UserID = userSettings.UserID,
                        Time = userSettings.Time,
                        SendAdminNotification = userSettings.SendAdminNotification,
                        SendChangedOrderNotification = userSettings.SendChangedOrderNotification,
                        SendWeeklyNotification = userSettings.SendWeeklyNotification,
                        SendDailyNotification = userSettings.SendDailyNotification
                    };
                }
            }
            return result;
        }

        public void SetUserSettings(UserSettingsModel model, int userId)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                var userSettings = dataContext.UserSettings.SingleOrDefault(x => x.UserID == userId);

                if (userSettings != null)
                {
                    userSettings.Time = model.Time;
                    userSettings.SendAdminNotification = model.SendAdminNotification;
                    userSettings.SendChangedOrderNotification = model.SendChangedOrderNotification;
                    userSettings.SendWeeklyNotification = model.SendWeeklyNotification;
                    userSettings.SendDailyNotification = model.SendDailyNotification;
                    userSettings.Time = model.Time;

                    dataContext.SaveChanges();
                }
            }
        }

        public IEnumerable<MenuItemWishModel> GetMenuItemWish(int customerUserId, DateTime date)
        {
            IEnumerable<MenuItemWishModel> result;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var entity = dataContext.p_MenuItemWish_Get(customerUserId, date);
                result = entity.Select(x => new MenuItemWishModel()
                {
                    MenuItemWishID = x.MenuItemWishID,
                    CustomerUserID = x.CustomerUserID,
                    MenuItemID = x.MenuItemID,
                    Date = x.Date,
                    CourseID = x.CourseID,
                    CourseName = x.CourseName,
                    CourseCategoryID = x.CourseCategoryID,
                    CourseCategoryName = x.CourseCategoryName
                }).ToList();
            }
            return result;
        }

        public IEnumerable<MenuItemWishModel> GetDayMenuItemWish(DateTime date)
        {
            IList<MenuItemWishModel> result = new List<MenuItemWishModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var entity = dataContext.p_MenuItemWish_GetAll(date);
                result = entity.Select(x => new MenuItemWishModel()
                {
                    MenuItemWishID = x.MenuItemWishID,
                    CustomerUserID = x.CustomerUserID,
                    MenuItemID = x.MenuItemID,
                    Date = x.Date,
                    CourseID = x.CourseID,
                    CourseName = x.CourseName,
                    CourseCategoryID = x.CourseCategoryID,
                    CourseCategoryName = x.CourseCategoryName
                }).ToList();
            }
            return result;
        }

        public void SetMenuItemWish(int customerUserId, DateTime date, int menuItemId)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_MenuItemWish_Upsert(customerUserId, menuItemId, date);
            }
        }

        public void DeleteMenuItemWish(int customerUserId, int menuItemId, DateTime date)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_MenuItemWish_Delete(customerUserId, menuItemId, date);
            }
        }

        public UserOrdersModel GetOrderByIdentityCard(int supplierCompanyId, DateTime date, string hexIdentityCard)
        {
            UserOrdersModel userOrders = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_Order_GetByIdentityCard(supplierCompanyId, date, hexIdentityCard);
                
                foreach (var item in list)
                {
                    if (userOrders == null)
                    {
                        userOrders = new UserOrdersModel
                        {
                            OrderID = item.OrderID,
                            UserID = item.UserID,
                            UserName = item.UserName,
                            IsPurchased = item.IsPurchased,
                            Orders = new List<OrderedMenuModel>()
                        };
                    }
                    if (item.UserID != userOrders.UserID)
                    {
                        throw new Exception(
                            string.Format("p_Order_GetByIdentityCard return wrong userOrders item:{0}; UserID: {1}", userOrders.UserID, item.UserID));
                    }
                    var order = new OrderedMenuModel
                    {
                        Course =
                            new CourseModel
                            {
                                ID = item.CourseID,
                                CategoryName = item.CourseCategoryName,
                                CategoryType = (CourseCategories)item.CourseCategoryID,
                                Name = item.CourseName,
                                Price = (float)item.CoursePrice,
                                OrderItemID = item.OrderItemID,
                                Boxindex = item.Boxindex
                            },
                        Quantity = (double)item.Quantity
                    };
                    userOrders.Orders.Add(order);
                }
            }
            return userOrders;
        }

        public IEnumerable<IdentityCardModel> GetIdentityCard(string hexIdentityCard)
        {
            IList<IdentityCardModel> result = new List<IdentityCardModel>();
            using (var dataContext = this.dataContextFactory.Create())
            {
                var list = dataContext.p_IdentityCard_CheckNumber(hexIdentityCard);
                foreach (var identityCard in list)
                {
                    result.Add(new IdentityCardModel()
                    {
                         UserName = identityCard.UserName,
                         UserEmail = identityCard.UserEmail,
                         CustomerUserID = identityCard.CustomerUserID,
                         CustomerCompanyID = identityCard.CustomerCompanyID,
                         IdentityNumber = identityCard.IdentityNumber,
                         PublicNumber = identityCard.PublicNumber,
                         CardHolderEmail = identityCard.CardHolderEmail,
                         CardHolderName = identityCard.CardHolderName
                    });
                }
            }
            return result;
        }

        public void AssignIdentityCardToUser(int companyId, int userId, string hexIdentityCard)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                // Check if identity card already assigned.
                var existingIdentityCard =
                    dataContext.IdentityCards.FirstOrDefault(
                        identityCard => identityCard.IdentityNumber == hexIdentityCard && identityCard.CustomerCompanyID == companyId);

                if (existingIdentityCard != null)
                {
                    // Check if identity card assigned to other user.
                    if (existingIdentityCard.CustomerUserID.HasValue)
                    {
                        if (existingIdentityCard.CustomerUserID != userId)
                            throw new Exception(
                                string.Format("Identity card '{0}' already assigned to other user.", hexIdentityCard));
                    }
                    // Assign existing identity card to user.
                    else
                    {
                        existingIdentityCard.CustomerUserID = userId;
                        dataContext.SaveChanges();
                        return;
                    }
                }



                var newIdentityCard = new IdentityCard
                        {
                            CustomerCompanyID = companyId,
                            IdentityNumber = hexIdentityCard,
                            CustomerUserID = userId,
                            PublicNumber = "",
                            Email = "",
                            Name = ""
                        };


                // Update user identity card if it already exists.
                var userIdentityCard =
                    dataContext.IdentityCards.FirstOrDefault(
                        identityCard =>
                            identityCard.CustomerUserID == userId && identityCard.CustomerCompanyID == companyId);

                if (userIdentityCard != null)
                {
                    newIdentityCard.Email = userIdentityCard.Email;
                    newIdentityCard.Name = userIdentityCard.Name;
                    newIdentityCard.PublicNumber = userIdentityCard.PublicNumber;

                    dataContext.IdentityCards.Remove(userIdentityCard);
                }

                // Create new identity card.
                dataContext.IdentityCards.Add(newIdentityCard);
                dataContext.SaveChanges();
            }
        }

        public void SetOrderPurchased(int orderId, TimeSpan time, bool isPurchased)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                dataContext.p_Order_SetPurchased(orderId, time, isPurchased);
            }
        }
    }
}
