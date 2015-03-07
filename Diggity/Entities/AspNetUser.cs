//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Diggity.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class AspNetUser : DiggityEntity
    {
        public AspNetUser()
        {
            this.AspNetUserClaims = new HashSet<AspNetUserClaim>();
            this.AspNetUserLogins = new HashSet<AspNetUserLogin>();
            this.PersonalRecords = new HashSet<PersonalRecord>();
            this.UserPreferences = new HashSet<UserPreference>();
            this.Workouts = new HashSet<Workout>();
            this.WorkoutTemplates = new HashSet<WorkoutTemplate>();
            this.AspNetRoles = new HashSet<AspNetRole>();
        }
    
        public string Id { get; set; }
        public string Hometown { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public Nullable<System.DateTime> LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public string UserName { get; set; }
    
        public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual ICollection<PersonalRecord> PersonalRecords { get; set; }
        public virtual ICollection<UserPreference> UserPreferences { get; set; }
        public virtual ICollection<Workout> Workouts { get; set; }
        public virtual ICollection<WorkoutTemplate> WorkoutTemplates { get; set; }
        public virtual ICollection<AspNetRole> AspNetRoles { get; set; }
    }
}
