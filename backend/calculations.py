#!/usr/bin/env python3
"""
Core 算命学 (Four Pillars of Destiny) Calculation Engine
Implements calculations for:
- 十干十二支 (10 Stems, 12 Branches)
- 陰占/陽占 (Yin/Yang Constellations)
- 十大主星 (10 Major Stars)
- 宇宙盤 (Cosmic Plate)
- 大運/年運 (Major/Annual Cycles)
"""

from datetime import datetime, date, timedelta
import pandas as pd
import os

class SanmeiCalculator:
    """Main calculation engine for Sanmei (Four Pillars of Destiny)"""

    def __init__(self):
        """Initialize calculator and load CSV data"""
        self.data_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'csv')
        self.data_loaded = False
        self.csv_data = {}
        self._load_csv_data()

    def _load_csv_data(self):
        """Load CSV files from data directory"""
        required_files = {
            'kaku': 'kaku.csv',
            'kyoku': 'kyoku.csv',
            'setsuiribi': 'setsuiribi.csv',
            'utsuwa': 'utsuwa.csv',
            'kakoushie': '60kakoushie.csv'
        }

        for key, filename in required_files.items():
            filepath = os.path.join(self.data_dir, filename)
            try:
                # Try Shift-JIS encoding (Japanese)
                self.csv_data[key] = pd.read_csv(filepath, encoding='shift_jis')
                print(f"✅ Loaded {filename}")
            except FileNotFoundError:
                print(f"⚠️  {filename} not found at {filepath}")
            except Exception as e:
                print(f"❌ Error loading {filename}: {str(e)}")

        self.data_loaded = len(self.csv_data) > 0

    def _get_stem_branch(self, year: int, month: int, day: int):
        """
        Calculate 干支 (Stem & Branch) for a given date

        Based on the 60-year cycle starting from Year 1 (甲子 - 2637 BCE in Eastern calendar)

        Returns:
        {
            'year_stem': str,      # e.g. '甲'
            'year_branch': str,    # e.g. '子'
            'month_stem': str,
            'month_branch': str,
            'day_stem': str,
            'day_branch': str,
            'hour_stem': str,
            'hour_branch': str
        }
        """
        try:
            # Define the 10 Stems (天干) and 12 Branches (地支)
            stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
            branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

            # Year calculation: 2637 BCE is year 0 of the 60-year cycle
            # We use year 1900 as a reference point (Gengzi Year)
            year_offset = year - 1900
            year_cycle = year_offset % 60

            year_stem = stems[year_cycle % 10]
            year_branch = branches[year_cycle % 12]

            # Month calculation (simplified, lunar-based)
            # The lunar month stem depends on the year stem and lunar month
            month_stem = stems[(year_offset * 5 + (month - 1)) % 10]
            month_branch = branches[(month - 1) % 12]

            # Day calculation (simplified, needs more precise lunar calendar)
            # Number of days from Jan 1, 1900 (Gengzi day)
            from datetime import date as date_type
            ref_date = date_type(1900, 1, 1)
            current_date = date_type(year, month, day)
            days_diff = (current_date - ref_date).days

            day_cycle = days_diff % 60
            day_stem = stems[day_cycle % 10]
            day_branch = branches[day_cycle % 12]

            # Hour calculation (12 two-hour periods per day)
            # 23:00 - 00:59 (子), 01:00 - 02:59 (丑), etc.
            # For now, use default (子)
            hour_stem = stems[(day_cycle % 10 + 1) % 10]  # Next stem
            hour_branch = branches[0]  # Default to 子

            return {
                'year_stem': year_stem,
                'year_branch': year_branch,
                'month_stem': month_stem,
                'month_branch': month_branch,
                'day_stem': day_stem,
                'day_branch': day_branch,
                'hour_stem': hour_stem,
                'hour_branch': hour_branch
            }
        except Exception as e:
            print(f"❌ Error calculating stem/branch: {str(e)}")
            return {
                'year_stem': 'エラー',
                'year_branch': 'エラー',
                'month_stem': '',
                'month_branch': '',
                'day_stem': '',
                'day_branch': '',
                'hour_stem': '',
                'hour_branch': ''
            }

    def _calculate_major_stars(self, stem_branch: dict):
        """
        Calculate 十大主星 (10 Major Stars) positions

        The 10 major stars are:
        1. 比肩 (Bi Jian)
        2. 劫財 (Jie Cai)
        3. 食神 (Shi Shen)
        4. 傷官 (Shang Guan)
        5. 偏財 (Pian Cai)
        6. 正財 (Zheng Cai)
        7. 偏官 (Pian Guan)
        8. 正官 (Zheng Guan)
        9. 偏印 (Pian Yin)
        10. 正印 (Zheng Yin)
        """
        # Define the 10 major stars
        major_stars_list = [
            '比肩', '劫財', '食神', '傷官', '偏財',
            '正財', '偏官', '正官', '偏印', '正印'
        ]

        # Simplified calculation based on day stem
        # In a real implementation, this would use complex rules
        try:
            stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

            # Extract stems
            day_stem = stem_branch.get('day_stem', '')
            year_stem = stem_branch.get('year_stem', '')
            month_stem = stem_branch.get('month_stem', '')
            hour_stem = stem_branch.get('hour_stem', '')

            # Find stem indices
            day_idx = stems.index(day_stem) if day_stem in stems else 0
            year_idx = stems.index(year_stem) if year_stem in stems else 0
            month_idx = stems.index(month_stem) if month_stem in stems else 0
            hour_idx = stems.index(hour_stem) if hour_stem in stems else 0

            # Simplified star assignment (based on stem relationships)
            year_star = major_stars_list[(year_idx * 3) % 10]
            month_star = major_stars_list[(month_idx * 3) % 10]
            day_star = major_stars_list[(day_idx * 3) % 10]
            hour_star = major_stars_list[(hour_idx * 3) % 10]

            return {
                'year': year_star,
                'month': month_star,
                'day': day_star,
                'hour': hour_star
            }
        except Exception as e:
            print(f"⚠️  Error calculating major stars: {str(e)}")
            return {
                'year': 'エラー',
                'month': 'エラー',
                'day': 'エラー',
                'hour': 'エラー'
            }

    def _calculate_cosmic_plate(self, stem_branch: dict, major_stars: dict):
        """
        Calculate 宇宙盤 (Cosmic Plate / 12 Palace positions)

        Maps the 12 branches to palace positions and determines
        which major stars appear in each palace.
        """
        branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
        palace_names = ['child', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
                       'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig']
        palace_chinese = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

        # Get day branch as the starting palace
        day_branch = stem_branch.get('day_branch', '子')
        try:
            day_branch_idx = branches.index(day_branch)
        except ValueError:
            day_branch_idx = 0

        # Initialize palace structure
        palaces = {}
        stars_order = [major_stars.get('year'), major_stars.get('month'),
                      major_stars.get('day'), major_stars.get('hour')]

        # Assign stars to palaces starting from day branch
        for i, palace_name in enumerate(palace_names):
            palace_idx = (day_branch_idx + i) % 12
            star_idx = i % 4  # Cycle through 4 stars

            palaces[palace_name] = {
                'branch': palace_chinese[palace_idx],
                'star': stars_order[star_idx] if star_idx < len(stars_order) else None,
                'degrees': palace_idx * 30  # 12 palaces = 360 degrees
            }

        return palaces

    def _calculate_yin_yang_constellations(self, stem_branch: dict):
        """
        Calculate 陰占 (Yin Constellation) and 陽占 (Yang Constellation)

        These represent the internal and external aspects of destiny
        """
        # Stems classification: Odd = Yang (陽), Even = Yin (陰)
        yin_stems = ['乙', '丁', '己', '辛', '癸']  # Yin stems
        yang_stems = ['甲', '丙', '戊', '庚', '壬']  # Yang stems

        year_stem = stem_branch.get('year_stem', '')
        month_stem = stem_branch.get('month_stem', '')
        day_stem = stem_branch.get('day_stem', '')
        hour_stem = stem_branch.get('hour_stem', '')

        # Determine yin/yang for each pillar
        yin_data = {
            'year_type': 'Yin (陰)' if year_stem in yin_stems else 'Yang (陽)',
            'month_type': 'Yin (陰)' if month_stem in yin_stems else 'Yang (陽)',
            'day_type': 'Yin (陰)' if day_stem in yin_stems else 'Yang (陽)',
            'hour_type': 'Yin (陰)' if hour_stem in yin_stems else 'Yang (陽)'
        }

        yang_data = {
            'year_type': 'Yin (陰)' if year_stem in yin_stems else 'Yang (陽)',
            'month_type': 'Yin (陰)' if month_stem in yin_stems else 'Yang (陽)',
            'day_type': 'Yin (陰)' if day_stem in yin_stems else 'Yang (陽)',
            'hour_type': 'Yin (陰)' if hour_stem in yin_stems else 'Yang (陽)'
        }

        return {
            'yin': {
                'description': 'Internal fate aspect (陰の側面)',
                'data': yin_data
            },
            'yang': {
                'description': 'External fate aspect (陽の側面)',
                'data': yang_data
            }
        }

    def _calculate_major_cycles(self, birth_date: date, current_year: int = None):
        """
        Calculate 大運 (Major Cycles) - typically 10-year periods
        and 年運 (Annual Cycles) - yearly predictions
        """
        if current_year is None:
            current_year = datetime.now().year

        # Calculate age and current major cycle period
        age = current_year - birth_date.year
        major_cycle_start = birth_date.year + (age // 10) * 10
        major_cycle_end = major_cycle_start + 10
        current_major_cycle = f"{major_cycle_start}-{major_cycle_end}"

        # Generate next 3 major cycles
        major_cycles_data = []
        for i in range(3):
            cycle_start = major_cycle_start + (i * 10)
            cycle_end = cycle_start + 10
            major_cycles_data.append({
                'period': f"{cycle_start}-{cycle_end}",
                'age_range': f"{age + (i * 10)}-{age + (i * 10) + 10}",
                'cycle_number': i + 1
            })

        # Generate next 5 years of annual cycles
        annual_cycles_data = []
        for i in range(5):
            year = current_year + i
            annual_cycles_data.append({
                'year': year,
                'age': age + i,
                'stem_index': (birth_date.year - 1900 + i) % 10,
                'branch_index': (birth_date.year - 1900 + i) % 12
            })

        return {
            'major_cycles': {
                'description': '10-year cycle periods (大運)',
                'current_cycle': current_major_cycle,
                'data': major_cycles_data
            },
            'annual_cycles': {
                'description': 'Yearly predictions (年運)',
                'current_year': current_year,
                'data': annual_cycles_data
            }
        }

    def calculate_destiny(self, birth_date: date):
        """
        Main calculation method for destiny table

        Args:
            birth_date: datetime.date object

        Returns:
            Dictionary containing:
            - 干支 (stem & branch)
            - 陰占/陽占 (yin/yang constellations)
            - 十大主星 (10 major stars)
            - 宇宙盤 (cosmic plate)
            - 大運/年運 (major/annual cycles)
        """
        y, m, d = birth_date.year, birth_date.month, birth_date.day

        # Get stem & branch
        stem_branch = self._get_stem_branch(y, m, d)

        # Calculate various aspects
        major_stars = self._calculate_major_stars(stem_branch)
        cosmic_plate = self._calculate_cosmic_plate(stem_branch, major_stars)
        yin_yang = self._calculate_yin_yang_constellations(stem_branch)
        cycles = self._calculate_major_cycles(birth_date)

        return {
            'birth_date': birth_date.isoformat(),
            'stem_branch': stem_branch,
            'yin_constellation': yin_yang['yin'],
            'yang_constellation': yin_yang['yang'],
            'major_stars': major_stars,
            'cosmic_plate': cosmic_plate,
            'major_cycles': cycles['major_cycles'],
            'annual_cycles': cycles['annual_cycles'],
            'status': 'calculation_complete'
        }

    def calculate_compatibility(self, date1: date, date2: date):
        """
        Calculate compatibility between two people

        Args:
            date1: First person's birth date
            date2: Second person's birth date

        Returns:
            Compatibility analysis including:
            - Overall compatibility score (0-100)
            - Detailed analysis
        """
        # Calculate both destinies
        destiny1 = self.calculate_destiny(date1)
        destiny2 = self.calculate_destiny(date2)

        # Calculate compatibility score based on stem/branch relationships
        sb1 = destiny1['stem_branch']
        sb2 = destiny2['stem_branch']

        # Extract stems and branches for comparison
        stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
        branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

        # Compatible branches (12-branch compatibility rule)
        # Trine: 0-4-8, 1-5-9, 2-6-10, 3-7-11
        compatible_sets = [
            ['子', '辰', '申'],  # Rat, Dragon, Monkey
            ['丑', '巳', '酉'],  # Ox, Snake, Rooster
            ['寅', '午', '戌'],  # Tiger, Horse, Dog
            ['卯', '未', '亥']   # Rabbit, Goat, Pig
        ]

        # Calculate base compatibility (0-50 points from stem/branch)
        score = 50

        # Check year branch compatibility
        year_branch1 = sb1['year_branch']
        year_branch2 = sb2['year_branch']

        for compatible_set in compatible_sets:
            if year_branch1 in compatible_set and year_branch2 in compatible_set:
                score += 10
                break

        # Check day branch compatibility (most important for romance)
        day_branch1 = sb1['day_branch']
        day_branch2 = sb2['day_branch']

        for compatible_set in compatible_sets:
            if day_branch1 in compatible_set and day_branch2 in compatible_set:
                score += 15
                break

        # Check month branch compatibility
        month_branch1 = sb1['month_branch']
        month_branch2 = sb2['month_branch']

        for compatible_set in compatible_sets:
            if month_branch1 in compatible_set and month_branch2 in compatible_set:
                score += 10
                break

        # Add bonus for matching major stars
        stars1 = destiny1['major_stars']
        stars2 = destiny2['major_stars']

        matching_stars = sum(1 for key in stars1 if stars1[key] == stars2[key])
        score += matching_stars * 5

        # Cap score at 100
        score = min(100, score)

        # Generate analysis
        analysis_points = []
        if year_branch1 == year_branch2:
            analysis_points.append("同じ 12支を持つ（年） - 運命的なつながり")
        if day_branch1 == day_branch2:
            analysis_points.append("同じ 12支を持つ（日） - 非常に強い相性")
        if matching_stars >= 2:
            analysis_points.append(f"{matching_stars}つの主星が一致 - 価値観が合致")
        if score >= 75:
            analysis_points.append("全体的に相性が良い")
        elif score >= 50:
            analysis_points.append("標準的な相性 - 相互理解が重要")
        else:
            analysis_points.append("相性を高めるには努力が必要")

        return {
            'person1': {
                'birth_date': date1.isoformat(),
                'destiny': destiny1
            },
            'person2': {
                'birth_date': date2.isoformat(),
                'destiny': destiny2
            },
            'compatibility': {
                'score': int(score),
                'analysis': '。'.join(analysis_points),
                'details': {
                    'year_branch_match': year_branch1 == year_branch2,
                    'day_branch_match': day_branch1 == day_branch2,
                    'month_branch_match': month_branch1 == month_branch2,
                    'matching_stars': matching_stars,
                    'compatibility_level': 'Very High' if score >= 80 else 'High' if score >= 65 else 'Moderate' if score >= 50 else 'Low'
                }
            },
            'status': 'calculation_complete'
        }
