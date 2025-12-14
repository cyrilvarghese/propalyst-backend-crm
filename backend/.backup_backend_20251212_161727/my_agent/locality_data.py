"""
Static data for localities, landmarks, and statistics.
"""

# Locality to landmark mappings
LANDMARK_TO_LOCALITIES = {
    "Manyata Tech Park": ["Hebbal", "Nagawara", "Thanisandra", "Yelahanka"],
    "Electronic City": ["Electronic City", "Bommanahalli", "Sarjapur Road"],
    "Whitefield": ["Whitefield", "Marathahalli", "Varthur"],
    "Airport": ["Devanahalli", "Yelahanka", "Hebbal"],
    "Koramangala": ["Koramangala", "HSR Layout", "BTM Layout"],
}

# Hardcoded locality statistics
LOCALITY_STATS = {
    "Indiranagar": {
        "avg_price_cr": 12.5,
        "five_year_cagr_pct": 8.2,
        "rental_yield_pct": 2.8,
    },
    "Koramangala": {
        "avg_price_cr": 11.0,
        "five_year_cagr_pct": 9.5,
        "rental_yield_pct": 3.1,
    },
    "Whitefield": {
        "avg_price_cr": 8.5,
        "five_year_cagr_pct": 10.2,
        "rental_yield_pct": 3.5,
    },
    "HSR Layout": {
        "avg_price_cr": 10.2,
        "five_year_cagr_pct": 9.8,
        "rental_yield_pct": 3.0,
    },
    "Sarjapur Road": {
        "avg_price_cr": 7.8,
        "five_year_cagr_pct": 11.5,
        "rental_yield_pct": 3.8,
    },
    "Hebbal": {
        "avg_price_cr": 9.0,
        "five_year_cagr_pct": 8.5,
        "rental_yield_pct": 3.2,
    },
}
