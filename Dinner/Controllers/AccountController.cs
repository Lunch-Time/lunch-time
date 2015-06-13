using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

using Dinner.Attributes;
using Dinner.Entities;
using Dinner.Entities.Company;
using Dinner.Entities.Exceptions;
using Dinner.Models;
using Dinner.Services;

namespace Dinner.Controllers
{
    using System.Globalization;

    using Dinner.Services.Security;

    [Authorize]
    public class AccountController : Controller
    {
        private readonly ISecurityService securityService;

        private readonly IAccountService accountService;

        private readonly ICompanyService companyService;

        private readonly IDinnerPrincipalProvider principalProvider;

        public AccountController(
            ISecurityService securityService, 
            IAccountService accountService,
            ICompanyService companyService,
            IDinnerPrincipalProvider principalProvider)
        {
            this.securityService = securityService;
            this.accountService = accountService;
            this.companyService = companyService;
            this.principalProvider = principalProvider;
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid && DoLogin(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                return Redirect(Url.Content("~/"));
            }

            // If we got this far, something failed, redisplay form
            ModelState.AddModelError(string.Empty, "The user name or password provided is incorrect.");
            return View(model);
        }

        [HttpGet]
        // [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            Logout();

            return Redirect(Url.Content("~/"));
        }

        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                try
                {
                    CreateUserAndAccount(model.DisplayName, model.UserName, model.Password);
                    DoLogin(model.UserName, model.Password, true);
                    return Redirect(Url.Content("~/"));
                }
                catch (UserAlreadyExistsException ex)
                {
                    ModelState.AddModelError("UserName", "Пользователь с такой почтой уже зарегистрирован!");
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Exception", e.Message);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        public ActionResult Manage(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Ваш пароль успешно изменен."
                : message == ManageMessageId.SetPasswordSuccess ? "Ваш пароль успешно изменен."
                : message == ManageMessageId.RemoveLoginSuccess ? "Внешний логин успешно удален."
                : string.Empty;
            ViewBag.ReturnUrl = Url.Action("Manage");
            return View();
        }

        [HttpPost]
        public ActionResult Manage(LocalPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to manage the user
                try
                {
                    this.accountService.ChangePassword(model.OldPassword, model.NewPassword);

                    return this.Manage(ManageMessageId.ChangePasswordSuccess);
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Exception", e.Message);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        public ActionResult ChangeDisplayName()
        {
            var user = this.principalProvider.Principal;
            var viewModel = new DisplayNameModel { DisplayName = user.Name };            
            return this.View(viewModel);
        }

        [HttpPost]
        public ActionResult ChangeDisplayName(DisplayNameModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to manage the user
                try
                {
                    this.accountService.ChangeName(model.DisplayName);

                    this.ViewBag.StatusMessage = "Изменения успешно сохранены";

                    var cookie = this.Request.Cookies[FormsAuthentication.FormsCookieName].Value;
                    var ticket = FormsAuthentication.Decrypt(cookie);
                    SetFormsAuthentication(
                        ticket.Version,
                        model.DisplayName,
                        ticket.IssueDate,
                        ticket.Expiration,
                        ticket.IsPersistent,
                        ticket.UserData);
                }
                catch (Exception e)
                {
                    ModelState.AddModelError(
                        "Exception",
                        string.Format("Не удалось сохранить изменения: {0}", e.Message));
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ResetPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to manage the user
                try
                {
                    this.accountService.ResetPassword(model.Email);

                    return this.RedirectToAction("ResetPasswordComplete");
                }
                catch (EmailNotValidException)
                {
                    ModelState.AddModelError(
                        "Email",
                        "Введен неправильный формат почты");
                }
                catch (UserNotFoundException)
                {
                    ModelState.AddModelError(
                        "Email",
                        "Пользователь с такой почтой не найден");
                }
                catch (Exception e)
                {
                    ModelState.AddModelError(
                        "Exception",
                        string.Format("Не удалось сохранить изменения: {0}", e.Message));
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ResetPasswordComplete()
        {
            return View();
        }

        public ActionResult Settings()
        {
            UserSettingsModel settings = this.accountService.GetUserSettings();
            return this.View(settings);
        }

        [HttpPost]
        public ActionResult Settings(UserSettingsModel model)
        {
            this.accountService.SetUserSettings(model);

            UserSettingsModel settings = this.accountService.GetUserSettings();
            return this.View(settings);
        }

        [AllowAnonymous]
        public ActionResult Unsubscribe(int id)
        {
            bool isSuccess = this.accountService.UnsubscribeUser(id);
            if (isSuccess)
            {
                return RedirectToAction("UnsubscribeComplete");
            }
            return this.View(false);
        }

        [AllowAnonymous]
        public ActionResult UnsubscribeComplete()
        {
            return this.View("Unsubscribe", true);
        }

        [Authorize]
        [Admin]
        public ActionResult CompanySettings()
        {
            CompanySettingsModel settings = this.companyService.GetSettings(principalProvider.Principal.CompanyID);
            return this.View(settings);
        }

        [Authorize]
        [Admin]
        [HttpPost]
        public ActionResult CompanySettings(CompanySettingsModel model)
        {
            model.CompanyID = principalProvider.Principal.CompanyID;
            this.companyService.SetSettings(model);

            CompanySettingsModel settings = this.companyService.GetSettings(model.CompanyID);
            return this.View(settings);
        }

        #region Helpers

        private void SetFormsAuthentication(
            int version,
            string name,
            DateTime issueDate,
            DateTime expirationDate,
            bool isPersistent,
            string userData)
        {
            var ticket = new FormsAuthenticationTicket(version, name, issueDate, expirationDate, isPersistent, userData);

            var encryptedTicket = FormsAuthentication.Encrypt(ticket);
            var formsAuthenticationCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            if (ticket.IsPersistent)
            {
                formsAuthenticationCookie.Expires = ticket.Expiration;
            }

            Response.Cookies.Add(formsAuthenticationCookie);
        }

        private bool DoLogin(string userName, string password, bool persistCookie)
        {
            DinnerPrincipal principal = securityService.Login(userName, password);

            if (principal.Identity.IsAuthenticated)
            {
                // TODO
                SetFormsAuthentication(
                    1, // version 
                    principal.Name, // user name
                    DateTime.Now, // create time
                    DateTime.Now.AddDays(365), // expire time
                    persistCookie, // persistent
                    principal.UserID.ToString(CultureInfo.InvariantCulture));
                    // user data such as roles

                return true;
            }
            
            return false;
        }

        private void Logout()
        {
             HttpCookie authCookie = System.Web.HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, string.Empty);
                cookie.Expires = DateTime.Now.AddDays(-1);

                Response.Cookies.Add(cookie);
                Session.Abandon();
            }
        }

        private void CreateUserAndAccount(string displayName, string userName, string password)
        {
            securityService.Register(displayName, userName, password);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return Redirect(Url.Content("~/"));
            }
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        #endregion
    }
}
